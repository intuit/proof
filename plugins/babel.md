# @proof-ui/babel-plugin

A plugin to enable babel as a test preprocessor, allowing the use of ES6/ESNext features while authoring.
The default configuration uses `@babel/preset-env`

## Installation

```bash
yarn add -D @proof-ui/babel-plugin
```

## Usage

```javascript
// proof.config.js
import BabelPlugin from '@proof-ui/babel-plugin';

export default {
  plugins: [
    new BabelPlugin({
      // Optional Configuration
    })
  ]
};
```

## Options

You can configure the babel-plugin through some options in it's constructor:

| Property | Description                                                                         | Type     | Default |
| -------- | ----------------------------------------------------------------------------------- | -------- | ------- |
| `config` | A [`babel`](https://babeljs.io/) configuration object to use when transpiling tests | `object` |         |

### Example

To enable typescript support in your tests

```javascript
import BabelPlugin from '@proof-ui/babel-plugin';

new BabelPlugin({
  config: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    presets: ['@babel/preset-env', '@babel/preset-typescript']
  }
});
```