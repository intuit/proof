import {
  Eyes,
  BatchInfo,
  VisualGridRunner,
  Target,
  Configuration,
  BrowserType,
  TestResultsStatus,
  TestResults,
} from '@applitools/eyes-webdriverio';
import Proof, { ProofPlugin, TestHookArgs, ProofTest } from '@proof-ui/core';
import { TestCallback } from '@proof-ui/test';
import CLIPlugin, { CLIOption, Arguments } from '@proof-ui/cli-plugin';
import { Logger } from '@proof-ui/logger';
import createApplitoolsLogHandler from './createApplitoolsLogHandler';

export interface ApplitoolsPluginConfig {
  delay?: number;
  configure?(configuration: Configuration): void;
}

const APPLITOOLS_SDK_ENV = 'APPLITOOLS_ID';

function defaultConfigure(configuration: Configuration) {
  configuration.addBrowser(1440, 800, BrowserType.CHROME);
  configuration.addBrowser(1024, 900, BrowserType.CHROME);
  configuration.addBrowser(768, 900, BrowserType.CHROME);
  configuration.addBrowser(320, 900, BrowserType.CHROME);
}

export default class ApplitoolsPlugin implements ProofPlugin, CLIPlugin {
  private readonly options: ApplitoolsPluginConfig;

  private readonly delay: number = 1000;

  private baseBatchName = 'batchName';

  private enabled = false;

  private readonly appSDKID = process.env[APPLITOOLS_SDK_ENV];

  constructor(options?: ApplitoolsPluginConfig) {
    this.options = options ?? {};
    if (options?.delay !== undefined) {
      this.delay = options.delay;
    }
  }

  private async runVisualCheck(
    eyes: Eyes,
    logger: Logger,
    name: string,
    browser: WebdriverIO.Browser
  ) {
    logger.trace(`Taking screenshot for ${name}`);

    let results: TestResults;
    try {
      await eyes.open(browser, 'proof/visual', name);
      await eyes.check(`${name ? `${name}-` : ''}`, Target.window());
      results = await eyes.close(false);
    } catch (error) {
      logger.error(error);

      if (eyes.isOpen) {
        eyes.abort();
      }

      throw error;
    }

    if (results.getStatus() !== TestResultsStatus.Passed) {
      throw new Error(
        `Applitools detected differences. See ${results.getUrl()} for details`
      );
    }
  }

  apply(proof: Proof) {
    if (!this.enabled) {
      return;
    }

    if (!this.appSDKID) {
      throw new Error(
        `Must specify an Applitools SDK ID under the ${APPLITOOLS_SDK_ENV} environment variable.`
      );
    }

    const runner = new VisualGridRunner({
      testConcurrency: 75,
    });
    const configuration = new Configuration({
      appName: 'Proof',
      testName: 'WebdriverIO Visual Grid',
      batch: new BatchInfo({ name: this.baseBatchName }),
      apiKey: this.appSDKID,
      forceFullPageScreenshot: true,
      hideScrollbars: true,
      stitchMode: 'CSS',
      waitBeforeScreenshots: this.delay > 0 ? this.delay : undefined,
    });

    const browserConfig = this.options.configure ?? defaultConfigure;
    browserConfig(configuration);

    proof.hooks.testStart.tap('visual', (t: ProofTest) => {
      t.hooks.beforeExecute.tapPromise(
        'visual',
        async (_testFunc: TestCallback, testArgs: TestHookArgs) => {
          const eyes = new Eyes(runner, configuration);
          eyes.setLogHandler(createApplitoolsLogHandler(testArgs.logger));

          await this.runVisualCheck(
            eyes,
            testArgs.logger,
            testArgs.name,
            testArgs.browser
          );
        }
      );
    });
  }

  command(): CLIOption {
    return {
      options: [
        {
          name: 'visual',
          description: 'Run visual tests using applitools against your stories',
          type: Boolean,
          defaultValue: false,
        },
        {
          name: 'visual-batch-name',
          description:
            'Change the batch name to use when reporting in applitools',
          type: String,
          defaultValue: `Local (${process.env.USER})`,
        },
      ],
    };
  }

  setArgs(args: Arguments) {
    if (args.visual) {
      this.enabled = true;
      if (args.visualBatchName) {
        this.baseBatchName = args.visualBatchName;
      }
    }
  }
}
