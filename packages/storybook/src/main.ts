import { getStorybook } from '@storybook/react';
import { STORY_RENDERED } from '@storybook/core-events';
import addons from '@storybook/addons';

interface ProofWindow extends Window {
  __proof__?: {
    getStorybook: () => any[];
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
