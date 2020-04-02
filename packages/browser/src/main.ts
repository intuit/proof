import chalk from 'chalk';
import { remote, BrowserObject } from 'webdriverio';
import { AsyncSeriesHook, SyncWaterfallHook, SyncHook } from 'tapable';
import { createLogger } from '@proof-ui/logger';
import urlJoin from 'url-join';
import { normalizeBaseURL, getStoryURL } from './url';
import { BrowserConfig, Grid } from './common';
import localGrid from './local-grid';

export * from './common';

export interface BrowserSession extends BrowserSessionOptions {
  browser: BrowserObject;
  config: BrowserConfig;
  url: string;
}

export interface BrowserSessionOptions {
  name: string;
  story?: string;
  kind?: string;
  path?: string;
}

const DefaultGridOptions: Record<Grid, any> = {
  local: {
    host: 'localhost',
    port: 4444,
    path: '/wd/hub',
    protocol: 'http',
  },
  remote: {
    port: 443,
    protocol: 'https',
  },
};

export default class BrowserFactory {
  public hooks = {
    resolveOptions: new SyncWaterfallHook<
      any,
      BrowserConfig,
      BrowserSessionOptions
    >(['wdioOptions', 'config', 'options']),
    create: new AsyncSeriesHook<BrowserSession>(['session']),
    capabilities: new SyncHook<Record<string, any>>(['capabilities']),
  };

  private readonly url: string;

  private readonly config: BrowserConfig;

  private readonly browserLogLevel: string;

  private readonly waitForRoot: number;

  constructor(options: {
    config: BrowserConfig;
    storybookBaseURL: string;
    logLevel: WebDriver.WebDriverLogTypes;
    waitForRoot?: number;
  }) {
    this.config = options.config;
    this.url = normalizeBaseURL(options.storybookBaseURL);
    this.browserLogLevel = options.logLevel;
    this.waitForRoot = options.waitForRoot ?? 1000;
  }

  private getOptions(options: BrowserSessionOptions) {
    const {
      grid,
      name,
      headless,
      platform,
      version,
      gridOptions,
    } = this.config;
    const { name: testName } = options;

    const normalGrid = grid ?? 'local';

    const chromeOptions = headless
      ? {
          args: [
            '--headless',
            '--disable-gpu',
            '--disable-extensions',
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--window-size=1280,800',
          ],
        }
      : {};

    const base = gridOptions?.[normalGrid]
      ? gridOptions[normalGrid]
      : DefaultGridOptions[normalGrid];

    const browserOptions = {
      ...base,
      sync: true,
      desiredCapabilities: {
        chromeOptions,
        overlappingCheckDisabled: true,
        name: `${testName} - ${platform} - ${name}`,
      },
      capabilities: {
        browserName: name,
        platform,
        version,
        ...base.desiredCapabilities,
      },
    };

    return browserOptions;
  }

  async create(
    options: BrowserSessionOptions,
    logger = createLogger({ scope: 'browser' })
  ): Promise<BrowserSession> {
    const { config } = this;
    logger.trace('Creating browser session', config);
    const grid = this.config.grid || 'local';
    const browserOptions = this.getOptions(options);
    let browser;

    try {
      if (grid === 'local') {
        await localGrid(true).start(browserOptions.port);
      }

      const remoteOptions = this.hooks.resolveOptions.call(
        browserOptions,
        config,
        options
      );
      logger.trace('Using options', remoteOptions);
      const url = urlJoin(
        getStoryURL(this.url, options.kind, options.story),
        options.path ?? ''
      );

      browser = await remote({
        ...remoteOptions,
        logLevel: this.browserLogLevel,
      });

      logger.complete(chalk.gray('sessionId'), browser.sessionId);

      logger.debug(`Going to url: ${url}`);
      await browser.url(url);

      browser.getSession().then((capabilities) => {
        this.hooks.capabilities.call(capabilities);
      });

      const session = {
        browser,
        config,
        ...options,
        url: this.url,
      };

      await this.hooks.create.promise(session);

      const root = options.story ? '#root' : '#storybook-preview-iframe';
      logger.debug(`Using root element: ${root}`);
      logger.debug(`Waiting ${this.waitForRoot}ms for root element to exist`);
      await (await browser.$(root)).waitForExist(this.waitForRoot);

      if (!options.story) {
        logger.trace('Swapping to storybook iframe');
        await browser.switchToFrame('storybook-preview-iframe');
      }

      logger.debug('title', await browser.getTitle());
      return session;
    } catch (error) {
      if (browser) {
        await browser.deleteSession();
      }

      throw error;
    }
  }

  async close() {
    const lg = localGrid();
    if (lg) {
      await lg.end();
    }
  }
}
