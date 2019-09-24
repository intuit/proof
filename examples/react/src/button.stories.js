import React from 'react';

import {storiesOf} from '@storybook/react';

const stories = storiesOf('Components|Button', module);

stories.add('Basic', () => {
  return (
    <div>
      <span id="clicky-button">Click Meeeeeee</span>
    </div>
  );
});

stories.add('Complicated', () => {
  return <button type="submit">Click me too</button>;
});
