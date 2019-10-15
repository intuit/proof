import Proof, { ProofPlugin, ProofTest, TestHookArgs } from '@proof-ui/core';
import { Browser } from '@proof-ui/browser';
import CLIPlugin, { CLIOption } from '@proof-ui/cli-plugin';
import fs from 'fs';
import * as axe from 'axe-core';
import { TestConfig } from '@proof-ui/test';

export interface A11yPluginConfig {
  config: axe.Spec;
  root?: string;
}

type AxeBrowser = Browser & {
  getAxeReport: (root: string, config: axe.Spec) => Promise<any>;
};

const defaultAxeConfig: axe.Spec = {};

function createMessage(config: TestConfig, violations: axe.Result[]): string {
  let message = '\nAccessibility Errors: \n';
  let total = 0;
  message += `Kind: ${config.kind} Story: ${config.story}\n`;
  for (const v of violations) {
    message += `Found ${v.nodes.length} ${v.id} errors: ${v.description}\n`;
    total += v.nodes.length;
    for (const n of v.nodes) {
      if (n.failureSummary && n.target) {
        message += `  ${n.failureSummary.replace('\n  ', '\n    ')}\n`;
        message += `    ${n.target.toString()}\n`;
      }
    }

    message += '\n';
  }

  return message;
}

async function write(content: string, fName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(fName, content, err => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

export default class A11yPlugin implements ProofPlugin, CLIPlugin {
  private enabled = false;
  private reportPath: string = 'proof-a11y.json';

  private root: string = '#root';

  private options: A11yPluginConfig;

  constructor(options?: A11yPluginConfig) {
    if (options && options.root) {
      this.root = options.root;
    }

    this.options = options || {
      config: defaultAxeConfig
    };
  }

  apply(proof: Proof) {
    if (!this.enabled) {
      return;
    }

    const testViolations: {
      story: string;
      kind: string;
      violations: any[];
    }[] = [];

    proof.hooks.testStart.tap('accessibility', (t: ProofTest) => {
      t.hooks.beforeExecute.tapPromise(
        'accessibility',
        async (_testFunc: any, testArgs: TestHookArgs) => {
          testArgs.browser.addCommand(
            'getAxeReport',
            async (root: string, axeConfig: axe.Spec) => {
              const axePath = require.resolve('axe-core');
              const axeSource = fs.readFileSync(axePath, 'utf8').toString();
              await testArgs.browser.execute(axeSource);
              const result = await testArgs.browser.executeAsync(
                (root, axeConfig, done) => {
                  axe.configure(axeConfig);
                  axe.run(root, (err, results) => {
                    if (err) done(err);
                    done(results);
                  });
                },
                root,
                axeConfig
              );
              if (result instanceof Error) {
                throw result;
              }

              return result.value;
            }
          );
        }
      );

      t.hooks.afterExecute.tapPromise('accessibility', async ({ browser }) => {
        const results = await (browser as AxeBrowser).getAxeReport(
          this.root,
          this.options.config
        );
        const violations = results && results.violations;

        testViolations.push({
          story: t.config.story,
          kind: t.config.kind,
          violations: violations || []
        });

        if (violations && violations.length > 0) {
          throw new Error(createMessage(t.config, violations));
        }
      });
    });

    proof.hooks.end.tapPromise('accessibility', async () => {
      if (this.reportPath) {
        await write(JSON.stringify(testViolations, null, 2), this.reportPath);
      }
    });
  }

  command(): CLIOption {
    return {
      options: [
        {
          name: 'a11y',
          description:
            'Run AXE on each test and report accessibility failures.',
          type: Boolean,
          defaultValue: false
        },
        {
          name: 'a11y-report',
          description: 'The file to write the accessibility report to',
          type: String,
          defaultValue: 'proof-a11y.json'
        }
      ]
    };
  }

  setArgs(args: any) {
    if (args.a11Y) {
      this.enabled = true;
    }
    if (args.a11YReport) {
      this.reportPath = args.a11YReport;
    }
  }
}
