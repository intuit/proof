import BrowserFactory, { BrowserSession } from '@proof-ui/browser';
import { logger as baseLogger, Logger } from '@proof-ui/logger';
import { promiseRetry } from './utils';

type StoryboookAPI = Array<{
  fileName: string;
  kind: string;
  stories: Array<{
    name: string;
  }>;
}>;

export type Storybook = Map<string, Set<string>>;

async function getBrowser(
  browserFactory: BrowserFactory,
  logger: Logger
): Promise<BrowserSession> {
  try {
    const browser = await browserFactory.create({ name: 'storybook' }, logger);
    return browser;
  } catch (e) {}

  return browserFactory.create(
    { name: 'storybook', path: 'index.html' },
    logger
  );
}

export async function getStories(
  browserFactory: BrowserFactory,
  logger = baseLogger
): Promise<Storybook> {
  const { browser, url } = await getBrowser(browserFactory, logger);

  logger.trace(`Getting stories from ${url}`);

  let stories;

  const getStoriesFromBrowser = async () => {
    await browser.switchToFrame(await browser.$('#storybook-preview-iframe'));

    return browser.execute<StoryboookAPI, []>(
      'return __STORYBOOK_CLIENT_API__.getStorybook()'
    );
  };

  try {
    stories = await promiseRetry(
      getStoriesFromBrowser,
      3,
      () =>
        new Promise<void>((r) => {
          setTimeout(() => r, 1000);
        })
    );
  } catch (error) {
    throw new Error(
      `Error getting stories from storybook. Make sure @proof-ui/storybook is an installed addon`
    );
  } finally {
    await browser.deleteSession();
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
    stories.forEach((story) => {
      lines.push(`\t${story}`);
    });
  });

  return lines.join('\n');
}
