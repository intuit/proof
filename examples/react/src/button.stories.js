import React from 'react';

export default {
  title: 'Components|Button',
};

export const Basic = () => (
  <div>
    <button id="clicky-button">Click Me</button>
  </div>
);

export const Complicated = () => <button type="submit">Click me too</button>;

export const ImageWithoutAlt = () => (
  <img src="https://github.com/intuit/proof/raw/master/packages/docs/src/media/proof.color.text.svg?sanitize=true" />
);
