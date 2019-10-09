# @proof-ui/junit-plugin

A plugin that outputs test results in the JUnit XML format.

## Installation

```bash
yarn add -D @proof-ui/junit-plugin
```

## Usage

```javascript
// proof.config.js
import JUnitPlugin from '@proof-ui/junit-plugin';

export default {
  plugins: [
    new JUnitPlugin({
      // Optional Configuration
    })
  ]
};
```

## Options

You can configure the junit-plugin through some options in it's constructor:

| Property     | Description                                                                              | Type     | Default             |
| ------------ | ---------------------------------------------------------------------------------------- | -------- | ------------------- |
| `reportPath` | The filePath to save the junit report to                                                 | `string` | `./proof-junit.xml` |
| `contextDir` | The path to the root of the testing file tree. Use in the report for relative file paths | `string` | `__automation__`    |
