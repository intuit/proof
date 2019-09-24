import { LogLevel } from '@proof/logger';
import { BrowserConfig } from '@proof/browser';

export interface TestRunOptions {
  url: string;
  logLevel?: LogLevel;
  testMatch?: string;
  concurrency?: number;
  retryCount?: number;
  browserConfig: BrowserConfig;
  waitForRoot?: number;
}

export interface TestResult {
  name: string;
  file: string;
  skipped?: boolean;
  error?: Error;
  time?: number;
  story: {
    kind: string;
    story: string;
  };
}

export interface SuiteResult {
  failures: number;
  total: number;
  skipped: number;
  tests: TestResult[];
}
