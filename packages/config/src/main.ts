import cosmicConfig from 'cosmiconfig';
import { logger } from '@proof-ui/logger';
import { Config } from './types';

export * from './types';

const defaultConfig: Config = {
  plugins: []
};

export async function getConfig(): Promise<Config> {
  const explorer = cosmicConfig('proof', {
    searchPlaces: ['proof.config.js']
  });
  const result = await explorer.search();

  if (!result) {
    logger.debug('Unable to locate config file. Using default');
    return defaultConfig;
  }

  logger.debug(`Using config from: ${result.filepath}`);
  return (result.config as any) || {};
}
