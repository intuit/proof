# @proof-ui/skip-tests-plugin

A plugin that adds the option to skip the _actual_ test execution, but preserve the before and after side-effects of a test. This is most widely used in conjunction with the [accessibility-plugin](./accessibility) or [applitools-plugin](./applitools) to limit the scope of each test run.

## Installation

```bash
yarn add -D @proof-ui/skip-tests-plugin
```

## Usage

```javascript
// proof.config.js
import SkipTestsPlugin from '@proof-ui/skip-tests-plugin';

export default {
  plugins: [new SkipTestsPlugin()]
};
```

```bash
# Command Line Usage
proof --skip-tests
```
