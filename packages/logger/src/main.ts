import { Signale } from 'signale';

export const logLevels = ['info', 'debug', 'trace', 'stupid'] as const;
export type LogLevel = typeof logLevels[number];

let LOG_LENGTH = 10;
let logLevel: LogLevel = 'info';

/** Change the log level for the CLI */
export function setLogLevel(v: LogLevel) {
  logLevel = v;
}

export function setLength(length: number) {
  LOG_LENGTH = length;
}

export function padScope(s: string, size = LOG_LENGTH) {
  if (s.length === size) {
    return s;
  }

  if (s.length > size) {
    return `${s.slice(0, size - 3)}…`;
  }

  if (s.length < size) {
    return `${s}${'.'.repeat(size - s.length)}`;
  }

  return s;
}

function callIfVerbose(
  level: LogLevel,
  fn: (...args: string[]) => void,
  ...args: string[]
) {
  if (logLevels.indexOf(logLevel) >= logLevels.indexOf(level)) {
    return fn(...args);
  }
}

const baseLogger = new Signale({
  types: {
    debug: {
      badge: '🦄',
      color: 'magenta',
      label: 'debug',
    },
    skip: {
      badge: '🤷',
      color: 'yellow',
      label: 'Skipping…',
    },
    trace: {
      badge: '🔊',
      color: 'gray',
      label: 'trace',
    },
    info: {
      badge: '💾',
      color: 'cyan',
      label: 'info',
    },
    note: {
      badge: '📝',
      color: 'blueBright',
      label: 'note',
    },
    complete: {
      badge: '🌟',
      color: 'green',
      label: 'complete',
    },
    await: {
      badge: '⏳',
      color: 'cyan',
      label: 'awaiting',
    },
    done: {
      badge: '🎉',
      color: 'greenBright',
      label: 'done',
    },
    error: {
      badge: '🚒',
      color: 'red',
      label: 'error',
    },
    pending: {
      badge: '🤞',
      color: 'magenta',
      label: 'pending',
    },
  },
});

export type Logger = typeof baseLogger;

function wrap(l: Logger): Logger {
  const { trace, skip, debug } = l;

  l.trace = (...args: any[]) => callIfVerbose('trace', trace, ...args);
  l.skip = (...args: any[]) => callIfVerbose('trace', skip, ...args);
  l.debug = (...args: any[]) => callIfVerbose('debug', debug, ...args);

  return l;
}

export const logger = wrap(baseLogger);

/** Create a logger scoped to a specific command */
export function createLogger({ scope }: { scope: string }) {
  const scoped = logger.scope(padScope(scope));
  return wrap(scoped);
}
