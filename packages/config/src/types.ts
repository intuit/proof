import { GridOptions } from '@proof/browser';
import { LogLevel } from '@proof/logger';

export interface Config {
  plugins: any[];
  url?: string;
  logLevel?: LogLevel;
  testMatch?: string;
  gridOptions?: GridOptions;
  concurrency?: number;
  retryCount?: number;
  waitForRoot?: number;
}
