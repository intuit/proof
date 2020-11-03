import Proof, { ProofPlugin, ProofTest, TestHookArgs } from '@proof-ui/core';
import { Browser } from '@proof-ui/browser';
import CLIPlugin, { CLIOption } from '@proof-ui/cli-plugin';
import { SnapshotState } from 'jest-snapshot';
import { toMatchImageSnapshot, MatchImageSnapshotOptions } from 'jest-image-snapshot';
import kebabCase from 'lodash/kebabCase';
import traverse from '@babel/traverse';
import sharp from 'sharp';
import fs from 'fs';

const SCREEN_SHOT_DIR = '.proof-image-snapshot-temp';

const getSnapshotsDir = ({ kind } : { story: string, kind: string }) => {
  return `components/${kind}/src/__image_snapshots__`;
};

const createSnapshotIdentifier : MatchImageSnapshotOptions['customSnapshotIdentifier'] = ({ currentTestName, counter }) => {
  return `${currentTestName}-${counter}`;
};

interface ToMatchImageSnapshotFunc {
  (image: Buffer, options: MatchImageSnapshotOptions): { message(): string; pass: boolean }
}

export type ImageSnapshotOptions = MatchImageSnapshotOptions & {
  windowWidth?: number;
  windowHeight?: number;
};

export type ImageSnapshotBrowser = Browser & {
  matchImageSnapshot: (params?: ImageSnapshotOptions) => Promise<boolean>;
};

export interface ImageSnapshotPluginOptions {
  /** Width of screenshot produced. */
  imageWidth?: number;
  /** Height of screenshot produced. */
  imageHeight?: number;
  /** Jest image snapshot parameters to be applied across all tests. */
  globalMatchOptions?: MatchImageSnapshotOptions;
  /* Function that returns a path which tells the plugin where to store snapshots */
  getSnapshotsDir?: (parameters: { story: string, kind: string }) => string;
};

export default class ImageSnapshotPlugin implements ProofPlugin, CLIPlugin {
  private updateSnapshots = false;
  private getSnapshotsDir = getSnapshotsDir;
  private imageWidth = 1280;
  private imageHeight = 800;
  private globalMatchOptions : MatchImageSnapshotOptions = {
    customSnapshotIdentifier: createSnapshotIdentifier,
    failureThresholdType: 'percent',
    failureThreshold: 0.01,
    blur: 1
  };

  constructor(options : ImageSnapshotPluginOptions = { globalMatchOptions: {} }) {
    this.getSnapshotsDir = options.getSnapshotsDir ?? this.getSnapshotsDir;
    this.imageWidth = options.imageWidth ?? this.imageWidth;
    this.imageHeight = options.imageHeight ?? this.imageHeight;
    this.globalMatchOptions = {
      ...this.globalMatchOptions,
      ...options.globalMatchOptions
    };
  }

  apply(proof: Proof) {
    const _globalMatchOptions = this.globalMatchOptions;
    const _getSnapshotsDir = this.getSnapshotsDir;
    const _imageWidth = this.imageWidth;
    const _imageHeight = this.imageHeight;
    const snapshotState = new SnapshotState('', {
      updateSnapshot: this.updateSnapshots ? "all" : "new",
      getPrettier: () => null,
      getBabelTraverse: () => traverse
    });;

    proof.hooks.start.tap('image-snapshot', () => {
      if (!fs.existsSync(SCREEN_SHOT_DIR)) {
        fs.mkdirSync(SCREEN_SHOT_DIR);
      }
    });

    proof.hooks.testStart.tap('image-snapshot', (t: ProofTest) => {
      t.hooks.beforeExecute.tapPromise(
        'image-snapshot',
        async (_testFunc: any, testArgs: TestHookArgs) => {
          testArgs.browser.addCommand(
            'matchImageSnapshot',
            async function(this: ImageSnapshotBrowser, {
              windowWidth = 1280,
              windowHeight = 800,
              ...rest
            } : ImageSnapshotOptions = {}) {
              await this.setWindowSize(windowWidth, windowHeight);
              
              const testName = `${kebabCase(testArgs.config.kind)}--${kebabCase(testArgs.config.story)}`;
              
              const screenShotBuffer = await this.saveScreenshot(`${SCREEN_SHOT_DIR}/${testName}.png`);
              
              const resized = await sharp(screenShotBuffer)
                .resize(_imageWidth, _imageHeight)
                .png()
                .toBuffer();

              const snapshotDir = _getSnapshotsDir({
                kind: testArgs.config.kind,
                story: testArgs.config.story
              });

              const result = (toMatchImageSnapshot as ToMatchImageSnapshotFunc).apply({
                snapshotState,
                isNot: false,
                testPath: snapshotDir,
                currentTestName: testName
              }, [resized, {
                customSnapshotsDir: snapshotDir,
                allowSizeMismatch: true,
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
      if (fs.existsSync(SCREEN_SHOT_DIR)) {
        fs.rmdirSync(SCREEN_SHOT_DIR, { recursive: true });
      }
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
