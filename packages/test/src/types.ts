import { Browser } from '@proof/browser';

export type TestService = (
  config: TestConfig,
  callback: TestCallback,
  file: string
) => void;

export interface TestArgs {
  browser: Browser;
  story: string;
  kind: string;
}

export interface TestConfig {
  kind: string;
  story: string;
  skip: boolean;
}

export type TestCallback = (args: TestArgs) => Promise<void>;
export type TestFn = (config: TestConfig, callback: TestCallback) => void;

export type Test = TestFn & {
  skip: TestFn;
};
