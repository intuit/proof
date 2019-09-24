import { configure } from '@storybook/react';
import configProof from '@proof-ui/storybook';

configProof();

function loadStories() {
  require('../src/button.stories');
}

configure(loadStories, module);
