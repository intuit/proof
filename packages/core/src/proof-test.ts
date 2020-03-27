import { AsyncSeriesHook, AsyncSeriesBailHook } from 'tapable';
import { TestConfig, TestCallback } from '@proof-ui/test';
import BrowserFactory, { Browser } from '@proof-ui/browser';
import { Logger } from '@proof-ui/logger';

export interface TestHookBaseArgs {
  logger: Logger;
  config: TestConfig;
  name: string;
}

export interface TestHookArgs extends TestHookBaseArgs {
  browser: Browser;
}

export default class ProofTest {
  public hooks = {
    start: new AsyncSeriesHook<TestHookArgs>(['hookArgs']),
    testFunction: new AsyncSeriesBailHook<TestCallback, TestHookArgs>([
      'testFunction',
      'hookArgs',
    ]),
    beforeExecute: new AsyncSeriesBailHook<TestCallback, TestHookArgs>([
      'testFunction',
      'hookArgs',
    ]),
    afterExecute: new AsyncSeriesHook<TestHookArgs>(['hookArgs']),
    end: new AsyncSeriesHook<TestHookBaseArgs>(['hookArgs']),
  };

  public logger: Logger;

  private readonly testFunction: TestCallback;

  public config: TestConfig;

  private readonly browserFactory: BrowserFactory;

  public name: string;

  constructor(options: {
    config: TestConfig;
    func: TestCallback;
    logger: Logger;
    browserFactory: BrowserFactory;
    name: string;
  }) {
    this.config = options.config;
    this.testFunction = options.func;
    this.logger = options.logger;
    this.browserFactory = options.browserFactory;
    this.name = options.name;
  }

  async run(): Promise<void> {
    const { logger } = this;
    const baseHookArgs = {
      logger: this.logger,
      config: this.config,
      name: this.name,
    };

    let browser;

    try {
      browser = (
        await this.browserFactory.create(
          {
            name: this.name,
            kind: this.config.kind,
            story: this.config.story,
          },
          logger
        )
      ).browser;

      const hookArgs = {
        ...baseHookArgs,
        browser,
      };

      logger.trace(`Got browser.`);
      const testFn: TestCallback =
        (await this.hooks.testFunction.promise(this.testFunction, hookArgs)) ||
        this.testFunction;

      await this.hooks.beforeExecute.promise(testFn, hookArgs);

      await testFn({
        browser,
        ...this.config,
      });
      await this.hooks.afterExecute.promise(hookArgs);
    } finally {
      await this.hooks.end.promise(baseHookArgs);
      if (browser) {
        await browser.deleteSession();
      }

      logger.trace(`Test Done`);
    }
  }
}
