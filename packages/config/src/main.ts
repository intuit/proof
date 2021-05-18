import { cosmiconfig } from 'cosmiconfig';
import { logger } from '@proof-ui/logger';
import { Config } from './types';

export * from './types';

const defaultConfig: Config = {
  plugins: [],
};

export async function getConfig(customConfig?: string): Promise<Config> {
  const explorer = cosmiconfig('proof', {
    searchPlaces: [customConfig, 'proof.config.js'].filter(Boolean) as string[],
  });
  const result = await explorer.search();

  if (!result) {
    logger.debug('Unable to locate config file. Using default');
    return defaultConfig;
  }

  logger.debug(`Using config file: ${result.filepath}`);

  return result.config || {};
}
