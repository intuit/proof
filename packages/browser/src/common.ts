const grids = ['local', 'remote'] as const;
export type Grid = typeof grids[number];

export type Browser = WebdriverIO.Browser;

const browserNames = [
  'chrome',
  'firefox',
  'internet explorer',
  'MicrosoftEdge',
  'safari',
] as const;

export type BrowserName = typeof browserNames[number];
export type GridOptions = Record<Grid, any>;
export interface BrowserConfig {
  name: BrowserName;
  platform?: string;
  version?: string;
  headless?: boolean;
  grid?: Grid;
  gridOptions?: GridOptions;
}

export interface WDIOOptions {
  host?: string;
  port?: number;
  path?: string;
  protocol?: 'http' | 'https';
}
