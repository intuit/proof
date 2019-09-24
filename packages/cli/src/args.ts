import { Command } from 'command-line-application';

export interface CLIArguments {
  config?: string;
  verbose?: 'v'[];
  testMatch?: string;
  port?: number;
  url?: string;
  remote?: boolean;
  headless?: boolean;
  browserName?: string;
  browserVersion?: string;
  browserPlatform?: string;
  concurrency?: number;
  retryCount?: number;
}

export default {
  name: 'proof',
  description: 'A test runner for storybook',
  examples: [
    {
      example: 'proof',
      desc: 'Run some tests using the default options'
    }
  ],
  options: [
    {
      name: 'config',
      alias: 'c',
      description: 'The location of the config file to use.',
      type: String
    },
    {
      name: 'verbose',
      alias: 'v',
      description: 'Talk louder. Can be repeated: -vv',
      type: Boolean,
      multiple: true
    },
    {
      name: 'concurrency',
      description: 'Number of tests to run at a time',
      type: Number,
      defaultValue: 6
    },
    {
      name: 'retry-count',
      description: 'Number of times to retry a failing test before giving up.',
      type: Number,
      defaultValue: 0
    },
    {
      name: 'test-match',
      alias: 't',
      description: 'The glob to use when searching for tests',
      type: String,
      defaultValue: '__automation__/**/*.test.js'
    },
    {
      name: 'port',
      alias: 'p',
      description:
        'The local port that a storybook is running on. A shorthand for --url http://localhost:<port>',
      type: Number
    },
    {
      name: 'url',
      alias: 'u',
      description: 'The url that storybook is running at. ',
      type: String,
      default: 'http://localhost'
    },
    {
      name: 'remote',
      description: 'Run the browser against a remote selenium server',
      type: Boolean,
      defaultValue: false
    },
    {
      name: 'headless',
      description: 'Run the browser headlessly',
      type: Boolean,
      defaultValue: false
    },
    {
      name: 'browser-name',
      description: 'The name of the browser to use',
      type: String,
      defaultValue: 'chrome'
    },
    {
      name: 'browser-version',
      description: 'The version of the browser to use',
      type: String
    },
    {
      name: 'browser-platform',
      description: 'The name of the platform to run the browser on',
      type: String
    }
  ]
} as Command;
