import React from 'react';

import { storiesOf } from '@storybook/react';

const stories = storiesOf('Components|Button', module);

stories.add('Basic', () => {
  return (
    <div>
      <span id="clicky-button">Click Me</span>
    </div>
  );
});

stories.add('Complicated', () => {
  return <button type="submit">Click me too</button>;
});

stories.add('Image without alt', () => (
  <img src="https://github.com/intuit/proof/raw/master/packages/docs/src/media/proof.color.text.svg?sanitize=true" />
));
