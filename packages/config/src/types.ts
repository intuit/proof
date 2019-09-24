import { GridOptions } from '@proof-ui/browser';
import { LogLevel } from '@proof-ui/logger';

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
