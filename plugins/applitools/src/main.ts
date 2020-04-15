import {
  Eyes,
  BatchInfo,
  VisualGridRunner,
  Target,
  Configuration,
} from '@applitools/eyes-webdriverio';
import { BrowserType } from '@applitools/eyes-selenium';
import Proof, {
  ProofPlugin,
  TestHookArgs,
  TestHookBaseArgs,
  ProofTest,
} from '@proof-ui/core';
import { TestCallback } from '@proof-ui/test';
import CLIPlugin, { CLIOption, Arguments } from '@proof-ui/cli-plugin';
import { Logger } from '@proof-ui/logger';

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

  private readonly visualSessions = new Map<string, Eyes>();

  private commonBatchInfo?: BatchInfo;

  constructor(options?: ApplitoolsPluginConfig) {
    this.options = options ?? {};
    if (options?.delay !== undefined) {
      this.delay = options.delay;
    }
  }

  private async createApplitoolsInstance(
    testArgs: TestHookArgs
  ): Promise<Eyes> {
    const eyes = new Eyes(new VisualGridRunner(75));
    const configuration = new Configuration();

    configuration.setAppName('Proof');
    configuration.setTestName('WebdriverIO Visual Grid');

    const browserConfig = this.options.configure ?? defaultConfigure;

    browserConfig(configuration);

    // Settings
    configuration.setApiKey(this.appSDKID!);
    configuration.setForceFullPageScreenshot(true);
    configuration.setHideScrollbars(true);
    configuration.stitchMode = 'CSS';
    eyes.setConfiguration(configuration);

    if (this.commonBatchInfo) {
      eyes.setBatch(
        this.commonBatchInfo._name,
        this.commonBatchInfo._id,
        this.commonBatchInfo._startedAt
      );
    } else {
      eyes.setBatch(this.baseBatchName);
      this.commonBatchInfo = eyes.getBatch();
    }

    await eyes.open(testArgs.browser, 'proof/visual', testArgs.name);
    return eyes;
  }

  private async runVisualCheck(eyes: Eyes, logger: Logger, name: string) {
    logger.trace(`Taking screenshot for ${name}`);
    if (this.delay > 0) {
      await new Promise((r) => setTimeout(r, this.delay));
    }

    await eyes.check(`${name ? `${name}-` : ''}`, Target.window());
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

    proof.hooks.testStart.tap('visual', (t: ProofTest) => {
      t.hooks.beforeExecute.tapPromise(
        'visual',
        async (_testFunc: TestCallback, testArgs: TestHookArgs) => {
          const eyes = await this.createApplitoolsInstance(testArgs);
          this.visualSessions.set(testArgs.name, eyes);
          await this.runVisualCheck(eyes, testArgs.logger, testArgs.name);
        }
      );

      t.hooks.afterExecute.tapPromise(
        'visual',
        async (testArgs: TestHookArgs) => {
          const eyes = this.visualSessions.get(testArgs.name);
          if (eyes) {
            await eyes.close();
          }
        }
      );

      t.hooks.end.tapPromise('visual', async (testArgs: TestHookBaseArgs) => {
        const eyes = this.visualSessions.get(testArgs.name);
        if (eyes) {
          await eyes.abortIfNotClosed();
          this.visualSessions.delete(testArgs.name);
        }
      });
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
