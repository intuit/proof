import BrowserFactory from '@proof-ui/browser';
import { logger as baseLogger, Logger } from '@proof-ui/logger';

export type Storybook = Map<string, Set<string>>;

async function getBrowser(browserFactory: BrowserFactory, logger: Logger) {
  try {
    return await browserFactory.create({ name: 'storybook' }, logger);
  } catch {
    return await browserFactory.create(
      { name: 'storybook', path: 'index.html' },
      logger
    );
  }
}

export async function getStories(
  browserFactory: BrowserFactory,
  logger = baseLogger
): Promise<Storybook> {
  const { browser, url } = await getBrowser(browserFactory, logger);

  logger.trace(`Getting stories from ${url}`);

  let stories;

  try {
    stories = (await browser.execute(() =>
      eval('window.__proof__.getStorybook()')
    )).value;
  } catch (e) {
    console.error(e);
    throw new Error(
      `Error getting stories from storybook. Make sure @proof-ui/storybook is an installed addon`
    );
  } finally {
    await browser.end();
  }

  const storybook: Storybook = new Map();

  stories.forEach((story: any) => {
    const localStories = new Set<string>();
    story.stories.forEach((storyInst: any) => {
      localStories.add(storyInst.name);
    });
    storybook.set(story.kind, localStories);
  });

  return storybook;
}

export function printStories(book: Storybook): string {
  const lines: string[] = [];

  book.forEach((stories, kind) => {
    lines.push(`${kind} ----`);
    stories.forEach(story => {
      lines.push(`\t${story}`);
    });
  });

  return lines.join('\n');
}
