import {
  Eyes,
  BatchInfo,
  VisualGridRunner,
  Target,
  Configuration,
  BrowserType,
  BrowserTypePlain,
  TestResultsStatus,
  TestResults,
  DesktopBrowserInfo,
  ChromeEmulationInfo,
  DeviceNamePlain,
  ScreenOrientationPlain,
  IOSDeviceInfo,
  AndroidDeviceInfo,
} from '@applitools/eyes-webdriverio';
import Proof, { ProofPlugin, TestHookArgs, ProofTest } from '@proof-ui/core';
import { TestCallback } from '@proof-ui/test';
import CLIPlugin, { CLIOption, Arguments } from '@proof-ui/cli-plugin';
import { Logger } from '@proof-ui/logger';
import createApplitoolsLogHandler from './createApplitoolsLogHandler';
import BrowserFactory from '@proof-ui/browser';

export interface ApplitoolsPluginConfig {
  /** Delay time before taking a screenshot (Default: 1000) */
  delay?: number;
  /** Optional function to configure applitools for all tests */
  configure?(configuration: Configuration): void;
  /** Set to true to resize browser before sending to the UltraFastGrid. Slower test runs but allows JS dependent on screen size to run before the DOM is sent to applitools for comparisons. (Default: false) */
  useWebdriverWindowSize?: boolean;
}

type ApplitoolsBrowsersInfo =
  | DesktopBrowserInfo
  | ChromeEmulationInfo
  | {
      deviceName: DeviceNamePlain;
      screenOrientation?: ScreenOrientationPlain;
    }
  | IOSDeviceInfo
  | AndroidDeviceInfo;

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

  apply(proof: Proof): void {
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

    const useWebdriverWindowSize = this.options.useWebdriverWindowSize ?? false;

    const browserConfigs: Array<{
      width: number;
      height: number;
      browsers: BrowserTypePlain[];
    }> = [];
    const otherConfigs: Array<ApplitoolsBrowsersInfo> = [];
    if (useWebdriverWindowSize) {
      configuration.getBrowsersInfo().forEach((info) => {
        // Group known screen sizes so browser can be resized before test runs to allow JS to run before image capture.
        if ('name' in info && info.name !== undefined) {
          const existing = browserConfigs.find(
            (w) => w.width === info.width && w.height === info.height
          );
          if (existing) {
            if (!existing.browsers.includes(info.name)) {
              existing.browsers.push(info.name);
            }
          } else {
            browserConfigs.push({
              width: info.width,
              height: info.height,
              browsers: [info.name],
            });
          }
        } else {
          // TODO: Find a way to get screen size info for all device types.
          otherConfigs.push(info);
        }
      });
    } else {
      otherConfigs.push(...configuration.getBrowsersInfo());
    }

    let browserFactory: BrowserFactory;
    proof.hooks.browserFactory.tap('visual', (factory) => {
      browserFactory = factory;
    });

    proof.hooks.testStart.tap('visual', (t: ProofTest) => {
      t.hooks.beforeExecute.tapPromise(
        'visual',
        async (_testFunc: TestCallback, testArgs: TestHookArgs) => {
          const applitoolsLogger = createApplitoolsLogHandler(testArgs.logger);

          const runTest = async (
            browsersInfo: ApplitoolsBrowsersInfo[],
            browser: WebdriverIO.Browser
          ): Promise<Error | undefined> => {
            try {
              const eyes = new Eyes(runner, configuration);
              const config = eyes.getConfiguration();
              config.setBrowsersInfo(browsersInfo);
              eyes.setConfiguration(config);
              eyes.setLogHandler(applitoolsLogger);

              await this.runVisualCheck(
                eyes,
                testArgs.logger,
                testArgs.name,
                browser
              );
            } catch (e) {
              return e as Error;
            }
          };

          const allTests = browserConfigs.map(async (browserConfig) => {
            const browserSession = await browserFactory.create(
              {
                name: testArgs.name,
                kind: testArgs.config.kind,
                story: testArgs.config.story,
              },
              testArgs.logger,
              browserConfig
            );

            const browsersInfo = browserConfig.browsers.map((browserName) => ({
              width: browserConfig.width,
              height: browserConfig.height,
              name: browserName,
            }));

            const result = await runTest(browsersInfo, browserSession.browser);
            if (browserSession.browser) {
              await browserSession.browser.deleteSession();
            }

            return result;
          });

          if (otherConfigs.length > 0) {
            allTests.push(runTest(otherConfigs, testArgs.browser));
          }

          const results = (await Promise.all(allTests)).filter(
            (result): result is Error => result !== undefined
          );

          if (results.length === 0) return;

          if (results.length === 1) throw results[0];

          throw new Error(
            `Visual tests failed for multiple screen sizes with the following messages:\n\t${results
              .map((e) => e.message)
              .join('\n\t')}`
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
