import { cosmiconfig } from 'cosmiconfig';
import { logger } from '@proof-ui/logger';
import { Config } from './types';

export * from './types';

const defaultConfig: Config = {
  plugins: [],
};

export async function getConfig(): Promise<Config> {
  const explorer = cosmiconfig('proof', {
    searchPlaces: ['proof.config.js'],
  });
  const result = await explorer.search();

  if (!result) {
    logger.info('Unable to locate config file. Using default');
    return defaultConfig;
  }

  logger.info(`Using config from: ${result.filepath}`);
  return result.config || {};
}
