export type TestService = (
  config: TestConfig,
  callback: TestCallback,
  file: string
) => void;

export interface TestArgs {
  browser: WebdriverIO.Browser;
  story: string;
  kind: string;
}

export interface TestConfig {
  kind: string;
  story: string;
  name?: string;
  skip?: boolean;
}

export type TestCallback = (args: TestArgs) => Promise<void>;
export type TestFn = (config: TestConfig, callback: TestCallback) => void;

export type Test = TestFn & {
  skip: TestFn;
};
