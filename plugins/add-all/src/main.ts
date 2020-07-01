import Proof, { ProofPlugin, Storybook, FoundTest } from '@proof-ui/core';
import CLIPlugin from '@proof-ui/cli-plugin';
import { toId } from '@proof-ui/utils';

export type FilterFn = (kind: string, story: string) => boolean;

export interface AddAllPluginConfig {
  /** Provide a filter function to include/exclude which stories get added */
  filter?: FilterFn;
}

export function createMissingTests(
  storybook: Storybook,
  existingTests: FoundTest[],
  filter: FilterFn
): FoundTest[] {
  const coveredStories = new Set<string>();
  let allGood = false;

  existingTests.forEach((t) => {
    const {
      config: { story, kind },
    } = t;

    if (allGood || (!kind && !story)) {
      // No filter -- so everything is covered
      allGood = true;
      return;
    }

    if (kind) {
      let stories = storybook.get(kind) ?? new Set();
      if (!stories) {
        return;
      }

      if (story) {
        stories = new Set([story]);
      }

      stories.forEach((coveredStory) => {
        coveredStories.add(toId(kind, coveredStory));
      });
    } else {
      storybook.forEach((_value, storyKind) => {
        coveredStories.add(toId(storyKind, story));
      });
    }
  });

  if (allGood) {
    return [];
  }

  const newTests: FoundTest[] = [];

  storybook.forEach((stories, kind) => {
    stories.forEach((story) => {
      if (!coveredStories.has(toId(kind, story)) && filter(kind, story)) {
        newTests.push({
          config: {
            kind,
            story,
            skip: false,
          },
          callback: () => Promise.resolve(),
          file: `add-all-generated/${toId(kind, story)}`,
        });
      }
    });
  });

  return newTests;
}

export default class AddAllPlugin implements ProofPlugin, CLIPlugin {
  private enabled = false;
  private readonly filter: FilterFn;

  constructor(options?: AddAllPluginConfig) {
    this.filter = options?.filter ? options.filter : () => true;
  }

  apply(proof: Proof) {
    if (!this.enabled) {
      return;
    }

    let stories: Storybook;

    proof.hooks.stories.tap('add-all', (actualStories: Storybook) => {
      stories = actualStories;
    });

    proof.hooks.testRunner.tap('add-all', (runner) => {
      runner.hooks.tests.tap('add-all', (foundTests: FoundTest[]) => {
        return [
          ...foundTests,
          ...createMissingTests(stories, foundTests, this.filter),
        ];
      });
    });
  }

  command() {
    return {
      options: [
        {
          name: 'add-all',
          description: 'Add an empty test for all stories missing one',
          type: Boolean,
          defaultValue: false,
        },
      ],
    };
  }

  setArgs(args: any) {
    if (args.addAll) {
      this.enabled = true;
    }
  }
}
