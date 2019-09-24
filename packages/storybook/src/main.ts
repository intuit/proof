import { getStorybook, StoryBucket } from '@storybook/react';
import { STORY_RENDERED } from '@storybook/core-events';

const addons: any = require('@storybook/addons').default;

interface ProofWindow extends Window {
  __proof__?: {
    getStorybook: () => StoryBucket[];
    rendered: () => boolean;
  };
}

declare let window: ProofWindow;

let storyRendered = false;

addons.getChannel().addListener(STORY_RENDERED, () => {
  storyRendered = true;
});

export default function configureStorybook() {
  if (typeof window === 'object' && !window.__proof__) {
    window.__proof__ = {
      getStorybook,
      rendered: () => storyRendered
    };
  }
}
