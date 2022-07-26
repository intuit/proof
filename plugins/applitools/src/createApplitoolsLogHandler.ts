import { Logger as ApplitoolsLogger } from '@applitools/eyes-webdriverio';
import { Logger } from '@proof-ui/logger';

export default (proofLogger: Logger) => {
  return new ApplitoolsLogger({
    show: true,
    handler: {
      log: (message: string) => proofLogger.trace(message),
      warn: (message: string) => proofLogger.warn(message),
      error: (message: string) => proofLogger.error(message),
      fatal: (message: string) => proofLogger.fatal(message),
    },
  }).getLogHandler();
};
