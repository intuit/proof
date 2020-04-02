declare module '@applitools/eyes-webdriverio' {
  import { BrowserType } from '@applitools/eyes-selenium';

  export interface ViewportSize {
    width: number;
    height: number;
  }

  export class VisualGridRunner {
    constructor(count?: number);
  }

  export interface WebdriverioCheckSettings {}

  export interface BatchInfo {
    _id: string;
    _name: string;
    _startedAt: string | Date;
    getId: () => string;
    getName: () => string;
  }

  export class Target {
    static window(): WebdriverioCheckSettings;
    static region(region: any, frame: any): WebdriverioCheckSettings;
    static frame(frame: any): WebdriverioCheckSettings;
  }

  export class By {
    static id(id: string): By;
    static cssSelector(selector: string): By;
  }

  export class Eyes {
    constructor(runner?: VisualGridRunner);

    setApiKey(key: string): void;

    close(): Promise<any>;

    getBatch(): BatchInfo;

    setBatch(
      batchOrName: string | BatchInfo,
      batchId?: string,
      batchDate?: string | Date
    ): void;

    abortIfNotClosed(): Promise<any>;

    setForceFullPageScreenshot(shoudForce: boolean): void;
    setHideScrollbars(shouldHide: boolean): void;

    stitchMode: string;

    checkWindow(name: string): Promise<any>;
    checkElementBySelector(
      selector: string | By,
      matchTimeout: number,
      tag: string
    ): Promise<any>;
    checkRegionBy(by: string | By, tag: string, timeout?: number): Promise<any>;
    check(name: string, checkSettings: WebdriverioCheckSettings): Promise<any>;

    open(
      driver: any,
      appName: string,
      testName: string,
      viewportSize?: ViewportSize
    ): Promise<any>;

    setConfiguration(conf: any): void;
  }

  export class Configuration {
    addBrowser(width: number, height: number, type: BrowserType): void;
  }
}
