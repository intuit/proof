import fg from 'fast-glob';
import path from 'path';
import { Logger, logger } from '@proof/logger';
import { TestConfig, TestCallback, _setCallbackService } from '@proof/test';
import { SyncHook, SyncWaterfallHook } from 'tapable';
import { TestMatcherFunction, createMatcher } from './utils';

export interface FoundTest {
  config: TestConfig;
  callback: TestCallback;
  file: string;
}

export default class Runner {
  public hooks = {
    files: new SyncHook<string[]>(['files']),
    tests: new SyncWaterfallHook<FoundTest[]>(['tests'])
  };

  private glob: string;

  private includeMatcher: TestMatcherFunction;

  private excludeMatcher: TestMatcherFunction;

  private tag?: string;

  private logger: Logger;

  constructor(options: {
    glob: string;
    include?: string;
    exclude?: string;
    tag?: string;
    logger?: Logger;
  }) {
    this.glob = options.glob;
    this.includeMatcher = options.include
      ? createMatcher(options.include)
      : () => true;
    this.excludeMatcher = options.exclude
      ? createMatcher(options.exclude)
      : () => false;
    this.tag = options.tag;
    this.logger = options.logger || logger;
  }

  shouldSkip(config: TestConfig): boolean {
    if (config.skip) {
      return true;
    }

    return false;
  }

  public async findTests(): Promise<FoundTest[]> {
    const files = (await fg(this.glob)).map(entryItem =>
      typeof entryItem === 'string' ? entryItem : entryItem.path
    );
    this.logger.trace('Found test files');
    const tests: FoundTest[] = [];
    const testAggregationService = (
      config: TestConfig,
      callback: TestCallback,
      file: string
    ) => {
      if (!this.shouldSkip(config)) {
        tests.push({ config, callback, file });
      }
    };

    _setCallbackService(testAggregationService);

    this.hooks.files.call(files);

    this.logger.trace(`Looking for tests in ${files.length} files.`);
    files.forEach(f => {
      const resolved = path.resolve(f);
      require(resolved);
    });

    return this.hooks.tests.call(tests);
  }
}
