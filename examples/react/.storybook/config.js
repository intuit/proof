import { configure } from '@storybook/react';

function loadStories() {
  require('../src/button.stories');
}

configure(loadStories, module);
