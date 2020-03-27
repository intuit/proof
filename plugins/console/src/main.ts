import chalk from 'chalk';
import Proof, {
  ProofPlugin,
  SuiteResult,
  FoundTest,
  TestResult,
} from '@proof-ui/core';
import { logger, createLogger } from '@proof-ui/logger';
import { stats } from '@proof-ui/utils';

function scope(s: string) {
  return createLogger({ scope: s });
}

const formatTime = (time: number | undefined): string => {
  return time ? `${(time / 1000).toFixed(2)}s` : '';
};

/**
 * Writes all of the test results and some stats to the console
 */
export default class ConsoleReporterPlugin implements ProofPlugin {
  getTimeStats(results: SuiteResult): string[] {
    const sortedTests = results.tests
      .filter((t) => t.time)
      .sort((t1, t2) => t2.time! - t1.time!);

    const { mean, median } = stats(sortedTests, (t) => t.time ?? 0);
    const fastest = sortedTests[0];
    const slowest = sortedTests[sortedTests.length - 1];
    const passing = results.total - results.skipped - results.failures;

    const testStuffs: string[] = [];

    if (passing > 0) {
      testStuffs.push(chalk.green(`${passing} passed`));
    }

    if (results.failures) {
      testStuffs.push(chalk.red(`${results.failures} failed`));
    }

    return [
      ...testStuffs,
      chalk.gray(`Fastest test: ${formatTime(fastest.time)} (${fastest.name})`),
      chalk.gray(`Slowest test: ${formatTime(slowest.time)} (${slowest.name})`),
      chalk.gray(`Mean time: ${formatTime(mean)}`),
      chalk.gray(`Median time: ${formatTime(median)}`),
    ];
  }

  apply(proof: Proof): void {
    let startTime = 0;
    let completedTests = 0;
    let totalTestCount = 0;
    let failedTests = 0;

    proof.hooks.start.tap('console reporter', () => {
      startTime = Date.now();
    });

    proof.hooks.tests.tap('console reporter', (tests: FoundTest[]) => {
      totalTestCount = tests.length;
    });

    proof.hooks.testFinish.tap('console reporter', (t: TestResult) => {
      if (t.time) {
        scope(t.name).complete(formatTime(t.time));
      }

      if (t.error) {
        failedTests += 1;
        scope(t.name).error(t.error);
      }

      completedTests += 1;
      const percent = (completedTests / totalTestCount) * 100;
      const failedPercent = (failedTests / totalTestCount) * 100;
      logger.done(
        `${percent.toFixed(
          1
        )}% (${completedTests} of ${totalTestCount}) tests finished. ${failedPercent.toFixed(
          1
        )}% (${failedTests}) test failed.`
      );
    });

    proof.hooks.end.tap('console reporter', (results: SuiteResult) => {
      const duration = chalk.underline(formatTime(Date.now() - startTime));

      if (results.total === 0) {
        logger.done(chalk.blue('Ran 0 tests'));
        return;
      }

      if (results.failures > 0) {
        logger.error(chalk.red('Failures:'));

        results.tests.forEach((t) => {
          if (!t.error) {
            return;
          }

          const file = `\n ↳ ${t.file}`;
          scope(t.name).error(chalk.red(t.error.message) + chalk.gray(file));
        });
      }

      logger.done(
        [
          chalk.blue(`Ran ${results.total} tests in ${duration}`),
          ...this.getTimeStats(results),
        ].join('\n\t\t- ')
      );
    });
  }
}
