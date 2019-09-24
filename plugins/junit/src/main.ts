import fs from 'fs';
import path from 'path';
import XMLBuilder from 'xmlbuilder';
import { newBuilder, TestSuite, Builder } from 'junit-report-builder';
import Proof, { ProofPlugin, SuiteResult } from '@proof/core';
import CLIPlugin, { Arguments } from '@proof/cli-plugin';

export interface JunitPluginConfig {
  reportPath: string;
  contextDir: string;
}

function writeReportToFile(report: Builder, file: string) {
  const tree = XMLBuilder.create('testsuites', {
    encoding: 'UTF-8'
  });
  report._testSuitesAndCases.forEach(suiteOrCase => {
    suiteOrCase.build(tree);
  });

  return new Promise(resolve => {
    const fileWriteStream = fs.createWriteStream(file, 'utf8');
    fileWriteStream.on('open', () => {
      tree.end(
        XMLBuilder.streamWriter(fileWriteStream, {
          pretty: true
        })
      );
      fileWriteStream.on('close', () => {
        resolve();
      });
      fileWriteStream.end();
    });
  });
}

export default class JunitPlugin implements ProofPlugin, CLIPlugin {
  private options: JunitPluginConfig;
  private disable = false;

  constructor(options?: JunitPluginConfig) {
    this.options = options || {
      reportPath: path.join('.', 'proof-junit.xml'),
      contextDir: '__automation__'
    };
  }

  apply(proof: Proof) {
    if (this.disable) {
      return;
    }

    const suites: Map<string, TestSuite> = new Map();

    proof.hooks.start.tap('junit', () => {});
    proof.hooks.end.tapPromise('junit', async (results: SuiteResult) => {
      const reportBuilder = newBuilder();
      results.tests.forEach(t => {
        if (!suites.has(t.story.kind)) {
          suites.set(
            t.story.kind,
            reportBuilder.testSuite().name(t.story.kind)
          );
        }

        const suite = suites.get(t.story.kind);
        if (!suite) {
          return;
        }

        const testCase = suite.testCase().name(t.name);
        if (t.error) {
          testCase.failure(t.error.message);
        } else if (t.skipped) {
          testCase.skipped();
        }

        if (t.time) {
          testCase.time(t.time / 1000);
        }
      });

      await writeReportToFile(reportBuilder, this.options.reportPath);
    });
  }

  command() {
    return {
      options: [
        {
          name: 'disable-junit',
          description: 'Disable writing the report to disk',
          type: Boolean,
          defaultValue: false
        }
      ]
    };
  }

  setArgs(args: Arguments) {
    if (args.disableJunit) {
      this.disable = true;
    }
  }
}
