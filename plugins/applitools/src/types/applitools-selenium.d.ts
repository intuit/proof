declare module '@applitools/eyes-selenium' {
  export class Configuration {
    public stitchMode: 'CSS';
    constructor();
    setAppName(name: string): void;
    setTestName(name: string): void;
    setParentBranchName(name: string): void;
    setApiKey(key: string): void;
    setForceFullPageScreenshot(force: boolean): void;
    setHideScrollbars(hide: boolean): void;

    addBrowser(width: number, height: number, browserType: BrowserType): void;
  }

  type BrowserType = 'CHROME';
  export const BrowserType: Record<string, BrowserType>;
}
