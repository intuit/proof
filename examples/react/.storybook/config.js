import { configure } from '@storybook/react';
import configProof from '@proof-ui/storybook';

function loadStories() {
  require('../src/button.stories');
}

configure(loadStories, module);
configProof();
