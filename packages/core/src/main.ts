import { SyncHook, AsyncSeriesHook } from 'tapable';
import { PromisePoolExecutor } from 'promise-pool-executor';
import {
  logger,
  createLogger,
  setLength,
  setLogLevel,
  LogLevel,
} from '@proof-ui/logger';
import BrowserFactory from '@proof-ui/browser';
import { TestConfig } from '@proof-ui/test';
import { TestRunOptions, TestResult, SuiteResult } from './types';
import { getStories, printStories, Storybook } from './storybook';
import TestRunner, { FoundTest } from './runner';
import { inflate, promiseRetry } from './utils';
import Test from './proof-test';

export * from './storybook';
export * from './proof-test';
export * from './runner';
export * from './types';

export { default as ProofTest } from './proof-test';
export { default as TestRunner } from './runner';

export interface ProofPlugin {
  apply(proof: Proof): void;
}

export interface ProofConfig {
  plugins?: ProofPlugin[];
}

export function createName(config: TestConfig) {
  return `${config.kind}--${config.story}`;
}

function browserLogLevel(logLevel?: LogLevel) {
  if (!logLevel || logLevel === 'info' || logLevel === 'debug') {
    return 'error';
  }

  if (logLevel === 'stupid') {
    return 'verbose';
  }

  return 'command';
}

export default class Proof {
  public hooks = {
    files: new SyncHook<string[]>(['files']),
    tests: new SyncHook<FoundTest[]>(['tests']),
    stories: new SyncHook<Storybook>(['stories']),
    browserFactory: new SyncHook<BrowserFactory>(['browserFactory']),
    testRunner: new SyncHook<TestRunner>(['runner']),
    testStart: new SyncHook<Test>(['test']),
    testFinish: new SyncHook<TestResult>(['testResult']),
    start: new SyncHook<TestRunOptions>(['testargs']),
    end: new AsyncSeriesHook<SuiteResult>(['results']),
  };

  constructor(config: ProofConfig) {
    if (config.plugins) {
      config.plugins.forEach((p) => p.apply(this));
    }
  }

  private createTest(
    testConfig: FoundTest,
    browserFactory: BrowserFactory
  ): Test {
    const name = `${testConfig.config.kind}--${testConfig.config.story}`;
    const scoppedLogger = createLogger({ scope: name });

    return new Test({
      config: testConfig.config,
      func: testConfig.callback,
      logger: scoppedLogger,
      browserFactory,
      name,
    });
  }

  private async runTest(
    test: Test,
    file: string,
    retryCount = 0
  ): Promise<TestResult> {
    const testResult: TestResult = {
      name: test.name,
      file,
      story: {
        kind: test.config.kind,
        story: test.config.story,
      },
    };

    const startTime = Date.now();

    try {
      await promiseRetry(
        () => test.run(),
        retryCount,
        (err, retriesLeft) => {
          test.logger.error(err);
          test.logger.warn(`Test failed. Retrying ${retriesLeft} more times.`);
        }
      );
    } catch (error) {
      testResult.error = error;
    }

    const endTime = Date.now();

    testResult.time = endTime - startTime;

    return testResult;
  }

  async run(options: TestRunOptions): Promise<SuiteResult> {
    setLogLevel(options.logLevel ?? 'info');
    this.hooks.start.call(options);
    logger.trace('Starting with options', options);
    const browserFactory = new BrowserFactory({
      config: options.browserConfig,
      storybookBaseURL: options.url,
      logLevel: browserLogLevel(options.logLevel),
      waitForRoot: options.waitForRoot,
    });
    this.hooks.browserFactory.call(browserFactory);

    const stories = await getStories(browserFactory, logger);
    this.hooks.stories.call(stories);

    logger.trace(`Found stories: \n ${printStories(stories)}`);

    const testRunner = new TestRunner({
      glob: options.testMatch ?? `__automation/**/*.js`,
      logger,
    });

    this.hooks.testRunner.call(testRunner);
    let tests = await testRunner.findTests();
    logger.debug(`Found ${tests.length} tests.`);
    tests = inflate(tests, stories);
    this.hooks.tests.call(tests);
    logger.debug(`Got ${tests.length} after inflating.`);

    const loglength = Math.max(
      ...tests.map((t) => createName(t.config).length)
    );
    setLength(loglength);

    const testResults: TestResult[] = await new PromisePoolExecutor({
      concurrencyLimit: options.concurrency ?? 6,
    })
      .addEachTask({
        data: tests,
        generator: async (testConfig) => {
          const test = this.createTest(testConfig, browserFactory);
          this.hooks.testStart.call(test);
          const result = await this.runTest(
            test,
            testConfig.file,
            options.retryCount
          );
          this.hooks.testFinish.call(result);
          return result;
        },
      })
      .promise();

    await browserFactory.close();

    const results = testResults.reduce(
      (suiteResults, test) => {
        if (test.skipped) {
          suiteResults.skipped += 1;
        } else if (test.error) {
          suiteResults.failures += 1;
        }

        return suiteResults;
      },
      {
        failures: 0,
        total: testResults.length,
        skipped: 0,
        tests: testResults,
      }
    );

    await this.hooks.end.promise(results);
    return results;
  }
}
