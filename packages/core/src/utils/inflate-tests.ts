import { logger } from '@proof-ui/logger';
import { FoundTest } from '../runner';
import { Storybook } from '../storybook';

// Fill out the kind and story for ones that match multiple
// Throw away stories that don't match anything
export default function inflateStorybookTests(
  foundTests: FoundTest[],
  storybook: Storybook
): FoundTest[] {
  const inflatedTests: FoundTest[] = [];

  foundTests.forEach((foundTest) => {
    if (foundTest.config.skip) {
      logger.skip(
        `Skipping test ${foundTest.config.kind} -- ${foundTest.config.story} in ${foundTest.file}`
      );
      return;
    }

    const stories: Array<{ story: string; kind: string }> = [];

    if (foundTest.config.kind) {
      // Filter the stories by the kind
      if (!storybook.has(foundTest.config.kind)) {
        throw new Error(
          `No storybook kind found for ${foundTest.config.kind} in ${foundTest.file}`
        );
      }

      const availableStories = storybook.get(foundTest.config.kind)!;

      if (foundTest.config.story) {
        if (!availableStories.has(foundTest.config.story)) {
          throw new Error(
            `No story found for ${foundTest.config.kind} -- ${foundTest.config.story} in ${foundTest.file}`
          );
        }

        stories.push({
          story: foundTest.config.story,
          kind: foundTest.config.kind,
        });
      } else {
        // Add all the stories under this category
        availableStories.forEach((story) => {
          stories.push({
            story,
            kind: foundTest.config.kind,
          });
        });
      }
    } else {
      // Add everything -- filter on story name if provided
      storybook.forEach((storySet, kind) => {
        if (foundTest.config.story) {
          if (storySet.has(foundTest.config.story)) {
            stories.push({
              story: foundTest.config.story,
              kind,
            });
          }
        } else {
          storySet.forEach((story) => {
            stories.push({
              story,
              kind,
            });
          });
        }
      });
    }

    stories.forEach((expandedConf) => {
      inflatedTests.push({
        ...foundTest,
        config: {
          ...foundTest.config,
          ...expandedConf,
        },
      });
    });
  });

  return inflatedTests;
}
