import chalk from 'chalk';
import * as webdriverio from 'webdriverio';
import { AsyncSeriesHook, SyncWaterfallHook, SyncHook } from 'tapable';
import { createLogger } from '@proof-ui/logger';
import urlJoin from 'url-join';
import { normalizeBaseURL, getStoryURL } from './url';
import { BrowserConfig, Browser, Grid } from './common';
import localGrid from './local-grid';
export * from './common';

export interface BrowserSession extends BrowserSessionOptions {
  browser: Browser;
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
    protocol: 'http'
  },
  remote: {
    port: 443,
    protocol: 'https'
  }
};

export default class BrowserFactory {
  public hooks = {
    resolveOptions: new SyncWaterfallHook<
      any,
      BrowserConfig,
      BrowserSessionOptions
    >(['wdioOptions', 'config', 'options']),
    create: new AsyncSeriesHook<BrowserSession>(['session']),
    capabilities: new SyncHook<Record<string, any>>(['capabilities'])
  };

  private url: string;

  private config: BrowserConfig;

  private browserLogLevel: string;

  private waitForRoot: number;

  constructor(options: {
    config: BrowserConfig;
    storybookBaseURL: string;
    logLevel: string;
    waitForRoot?: number;
  }) {
    this.config = options.config;
    this.url = normalizeBaseURL(options.storybookBaseURL);
    this.browserLogLevel = options.logLevel;
    this.waitForRoot = options.waitForRoot || 1000;
  }

  private getOptions(options: BrowserSessionOptions) {
    const {
      grid,
      name,
      headless,
      platform,
      version,
      gridOptions
    } = this.config;
    const { name: testName } = options;

    const normalGrid = grid || 'local';

    const chromeOptions = headless
      ? {
          args: [
            '--headless',
            '--disable-gpu',
            '--disable-extensions',
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--window-size=1280,800'
          ]
        }
      : undefined;

    const base =
      gridOptions && gridOptions[normalGrid]
        ? gridOptions[normalGrid]
        : DefaultGridOptions[normalGrid];

    const browserOptions = {
      ...base,
      sync: false,
      desiredCapabilities: {
        acceptSslCerts: true,
        browserName: name,
        platform,
        version,
        chromeOptions,
        overlappingCheckDisabled: true,
        name: `${testName} - ${platform} - ${name}`,
        ...base.desiredCapabilities
      }
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
    let browser;

    try {
      if (grid === 'local') {
        await localGrid(true).start();
      }

      const remoteOptions = this.hooks.resolveOptions.call(
        this.getOptions(options),
        config,
        options
      );
      logger.trace('Using options', remoteOptions);

      const remoteClient = webdriverio.remote({
        ...remoteOptions,
        logLevel: this.browserLogLevel
      });

      const remoteSession = remoteClient.init();
      remoteSession.then(capabilities => {
        logger.complete(chalk.gray('sessionId'), capabilities.sessionId);
        const value = capabilities.value as any;
        if (value) {
          this.hooks.capabilities.call(value);
        }
      });

      const url = urlJoin(
        getStoryURL(this.url, options.kind, options.story),
        options.path || ''
      );
      logger.debug(`Going to url: ${url}`);
      browser = (remoteSession.url(url) as any) as Browser;

      const session = {
        browser,
        config,
        ...options,
        url: this.url
      };

      await this.hooks.create.promise(session);

      const root = options.story ? '#root' : '#storybook-preview-iframe';
      logger.debug(`Using root element: ${root}`);
      logger.debug(`Waiting ${this.waitForRoot}ms for root element to exist`);
      await browser.waitForExist(root, this.waitForRoot);

      if (!options.story) {
        logger.trace('Swapping to storybook iframe');
        await browser.frame('storybook-preview-iframe');
      }

      return session;
    } catch (e) {
      if (browser) {
        await browser.end();
      }
      throw e;
    }
  }

  async close() {
    const lg = localGrid();
    if (lg) {
      await lg.end();
    }
  }
}
