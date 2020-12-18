import Proof, { ProofPlugin, ProofTest, TestHookArgs } from '@proof-ui/core';
import { Browser } from '@proof-ui/browser';
import CLIPlugin, { CLIOption } from '@proof-ui/cli-plugin';
import { SnapshotState, SnapshotStateType } from 'jest-snapshot';
import { toMatchImageSnapshot, MatchImageSnapshotOptions } from 'jest-image-snapshot';
import kebabCase from 'lodash/kebabCase';
import traverse from '@babel/traverse';
import tmp, { DirResult } from 'tmp';

const getSnapshotsDir = ({ kind } : { story: string, kind: string }) => {
  return `components/${kind}/src/__image_snapshots__`;
};

interface ToMatchImageSnapshotFunc {
  (image: Buffer, options: MatchImageSnapshotOptions): { message(): string; pass: boolean }
}

interface BrowserCapabilities {
    browserName?: string;
    windowHeight?: number;
    windowWidth?: number;
    platformName?: string;
    browserVersion?: string;
}

interface CustomSnapshotIdentifierFunc {
  (this: BrowserCapabilities, args: {
    testPath?: string;
    currentTestName?: string;
    counter?: number;
    defaultIdentifier?: string;
  }) : string;
}

const createSnapshotIdentifier : CustomSnapshotIdentifierFunc = function({ currentTestName, counter }) {
  return `${currentTestName}-${counter}`;
};

export type ImageSnapshotOptions = Omit<MatchImageSnapshotOptions, 'customSnapshotIdentifier'> & {
  customSnapshotIdentifier: CustomSnapshotIdentifierFunc;
  windowWidth: number;
  windowHeight: number;
};

export type ImageSnapshotArgs = Omit<MatchImageSnapshotOptions, 'customSnapshotIdentifier'> & {
  windowWidth?: number;
  windowHeight?: number;
  customSnapshotIdentifier?: CustomSnapshotIdentifierFunc;
};

export type ImageSnapshotBrowser = Browser & {
  matchImageSnapshot: (params?: ImageSnapshotOptions) => Promise<boolean>;
};

export interface ImageSnapshotPluginOptions {
  /** Jest image snapshot parameters to be applied across all tests. */
  globalMatchOptions?: ImageSnapshotArgs;
  /* Function that returns a path which tells the plugin where to store snapshots */
  getSnapshotsDir?: (parameters: { story: string, kind: string }) => string;
};

export default class ImageSnapshotPlugin implements ProofPlugin, CLIPlugin {
  private updateSnapshots = false;
  private getSnapshotsDir = getSnapshotsDir;
  private globalMatchOptions : ImageSnapshotOptions = {
    windowHeight: 1280,
    windowWidth: 800,
    customSnapshotIdentifier: createSnapshotIdentifier,
    failureThresholdType: 'percent',
    failureThreshold: 0.01,
    blur: 1
  };

  constructor(options : ImageSnapshotPluginOptions = { globalMatchOptions: {} }) {
    this.getSnapshotsDir = options.getSnapshotsDir ?? this.getSnapshotsDir;
    this.globalMatchOptions = {
      ...this.globalMatchOptions,
      ...options.globalMatchOptions
    };
  }

  apply(proof: Proof) {
    const { 
      windowHeight: _windowHeight,
      windowWidth: _windowWidth,
      customSnapshotIdentifier: _customSnapshotIdentifier,
      ..._globalMatchOptions
    } = this.globalMatchOptions;
    let tempDir : DirResult;
    const _getSnapshotsDir = this.getSnapshotsDir;
    let snapshotState : SnapshotStateType;

    proof.hooks.start.tap('image-snapshot', () => {
      snapshotState = new SnapshotState('', {
        updateSnapshot: this.updateSnapshots ? "all" : "new",
        getPrettier: () => null,
        getBabelTraverse: () => traverse
      });

      tempDir = tmp.dirSync({
        unsafeCleanup: true
      });
    });

    proof.hooks.testStart.tap('image-snapshot', (t: ProofTest) => {
      t.hooks.beforeExecute.tapPromise(
        'image-snapshot',
        async (_testFunc: any, testArgs: TestHookArgs) => {
          testArgs.browser.addCommand(
            'matchImageSnapshot',
            async function(this: WebdriverIO.BrowserObject, {
              windowWidth = _windowWidth,
              windowHeight = _windowHeight,
              ...rest
            } : ImageSnapshotArgs) {
              await this.setWindowSize(windowWidth, windowHeight);
              
              const testName = `${kebabCase(testArgs.config.kind)}--${kebabCase(testArgs.config.story)}`;
              
              const screenShotBuffer = await this.saveScreenshot(`${tempDir.name}/${testName}.png`);

              const snapshotDir = _getSnapshotsDir({
                kind: testArgs.config.kind,
                story: testArgs.config.story
              });

              const result = (toMatchImageSnapshot as ToMatchImageSnapshotFunc).apply({
                snapshotState,
                isNot: false,
                testPath: snapshotDir,
                currentTestName: testName,
              }, [screenShotBuffer, {
                customSnapshotIdentifier: _customSnapshotIdentifier.bind({
                  windowHeight,
                  windowWidth,
                  browserName: this.capabilities.browserName,
                  platformName: this.capabilities.platformName,
                  browserVersion: this.capabilities.browserVersion
                }),
                customSnapshotsDir: snapshotDir,
                allowSizeMismatch: true,
                diffDirection: 'vertical',
                ..._globalMatchOptions,
                ...rest
              }]);

              if (!result.pass) {
                throw new Error(result.message());
              }

              return result.pass;
            }
          )
        }
      );
    });

    proof.hooks.end.tapPromise('image-snapshot', async () => {
      tempDir.removeCallback();
    });
  }

  command(): CLIOption {
    return {
      options: [
        {
          name: 'updateSnapshots',
          description:
            'Updates the image snapshots of the tests that are run.',
          type: Boolean,
          defaultValue: false,
        }
      ],
    };
  }

  setArgs(args: any) {
    if (args._all.updateSnapshots) {
      this.updateSnapshots = true;
    }
  }
}