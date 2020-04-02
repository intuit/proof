import { app, Command } from 'command-line-application';
import Proof, { ProofPlugin } from '@proof-ui/core';
import CLIPlugin from '@proof-ui/cli-plugin';
import { getConfig, Config } from '@proof-ui/config';
import BabelPlugin from '@proof-ui/babel-plugin';
import url from 'url';
import { LogLevel, logger, logLevels } from '@proof-ui/logger';
import ConsoleReporterPlugin from '@proof-ui/console-plugin';
import appDef, { CLIArguments } from './args';

const defaultPlugins = [
  new BabelPlugin({
    config: {
      presets: ['@babel/preset-env'],
    },
  }),
];

function getUrl(args: any, conf: Config): string {
  if (args.url) {
    const parsed = url.parse(args.url);
    if (!args.port || parsed.port) {
      return args.url;
    }

    if (args.port) {
      return url.format({
        port: args.port,
        hostname: parsed.hostname,
        protocol: parsed.protocol,
      });
    }
  } else if (args.port) {
    return url.format({
      port: args.port,
      hostname: 'localhost',
      protocol: 'http',
    });
  }

  return conf.url ?? 'http://localhost:6060';
}

function getLogLevel(args: any, conf: Config): LogLevel {
  if (args.verbose) {
    return logLevels[Math.min(args.verbose.length, logLevels.length - 1)];
  }

  if (conf.logLevel) {
    return conf.logLevel;
  }

  return 'info';
}

function handleUnknownArgs(unknownArgs: string[]) {
  logger.error('Invalid arguments. Use `proof -h` to see a list of options.');
  logger.error(`Unknown args: ${unknownArgs.join(' ')}`);
}

export async function getAppDefinition(conf: Config) {
  let fullAppDef: Command = appDef;

  const plugins = conf.plugins || defaultPlugins;

  plugins.forEach((plugin: CLIPlugin & ProofPlugin) => {
    if (plugin.command) {
      const { options, examples } = plugin.command();

      fullAppDef = {
        ...fullAppDef,
        options: [...(fullAppDef.options ?? []), ...options],
        examples: examples
          ? [...(fullAppDef.examples ?? []), ...examples]
          : fullAppDef.examples,
      };
    }
  });

  return fullAppDef;
}

type ParsedCLIArgs = CLIArguments & {
  _unknown?: string[];
};

async function getOptions() {
  const config = await getConfig();

  const fullAppDef = await getAppDefinition(config);
  const args = app(fullAppDef, { argv: process.argv }) as ParsedCLIArgs;

  return { config, args };
}

export async function main(options?: { config: Config; args: ParsedCLIArgs }) {
  const { config, args } = options || (await getOptions());

  const plugins: Array<CLIPlugin & ProofPlugin> = [
    new ConsoleReporterPlugin(),
    ...(config.plugins || defaultPlugins),
  ];

  if (!args) {
    return;
  }

  if (args._unknown) {
    return handleUnknownArgs(args._unknown);
  }

  plugins.forEach((plugin: CLIPlugin & ProofPlugin) => {
    if (plugin.setArgs) {
      plugin.setArgs(args);
    }
  });

  const proof = new Proof({
    plugins,
  });

  return proof.run({
    browserConfig: {
      name: args.browserName as any,
      platform: args.browserPlatform,
      version: args.browserVersion,
      headless: args.headless,
      grid: args.remote ? 'remote' : 'local',
      gridOptions: config.gridOptions,
    },
    ...config,
    url: getUrl(args, config),
    logLevel: getLogLevel(args, config),
    concurrency: args.concurrency ?? config.concurrency,
    retryCount: args.retryCount ?? config.retryCount,
  });
}

export default function run() {
  main().catch((ex) => {
    console.error(ex);
    process.exit(1);
  });
}
