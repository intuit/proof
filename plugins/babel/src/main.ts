import Proof, { ProofPlugin, TestRunner } from '@proof-ui/core';
import path from 'path';

export interface BabelPluginConfig {
  config: Record<string, any>;
}

export default class BabelPlugin implements ProofPlugin {
  private readonly options: BabelPluginConfig;

  constructor(options?: BabelPluginConfig) {
    this.options = options ?? {
      config: {
        presets: ['@babel/preset-env', 'babel-preset-power-assert'],
      },
    };
  }

  apply(proof: Proof) {
    proof.hooks.testRunner.tap('babel', (runner: TestRunner) => {
      runner.hooks.files.tap('babel', (files: string[]) => {
        const relativePaths = files.map((p) => path.resolve(p));

        // eslint-disable-next-line
        require('@babel/register')({
          babelrc: false,
          ignore: [
            (fPath: string) => {
              return !relativePaths.includes(fPath);
            },
          ],
          ...this.options.config,
        });
      });
    });
  }
}
