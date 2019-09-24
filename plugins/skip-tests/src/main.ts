import Proof, { ProofPlugin, ProofTest } from '@proof-ui/core';
import CLIPlugin, { Arguments } from '@proof-ui/cli-plugin';

export default class SkipTestPlugin implements ProofPlugin, CLIPlugin {
  private skipTests = false;

  apply(proof: Proof) {
    if (!this.skipTests) {
      return;
    }

    proof.hooks.testStart.tap('skip', (t: ProofTest) => {
      t.hooks.testFunction.tapPromise('skip', async () => {
        return () => Promise.resolve();
      });
    });
  }

  command() {
    return {
      options: [
        {
          name: 'skip-tests',
          alias: 's',
          description: 'Skip the actual test execution',
          type: Boolean,
          defaultValue: false
        }
      ]
    };
  }

  setArgs(args: Arguments) {
    if (args.skipTests) {
      this.skipTests = true;
    }
  }
}
