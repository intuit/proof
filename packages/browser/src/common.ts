import { Client } from 'webdriverio';

export type Browser = Client<void>;

const grids = ['local', 'remote'] as const;
export type Grid = typeof grids[number];

const browserNames = [
  'chrome',
  'firefox',
  'internet explorer',
  'MicrosoftEdge',
  'safari'
] as const;

export type BrowserName = typeof browserNames[number];
export type GridOptions = Record<Grid, object>;
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
