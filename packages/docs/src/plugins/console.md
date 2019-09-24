# @proof/console-plugin

A plugin that logs test results to the console.

## Installation

```bash
yarn add -D @proof/console-plugin
```

## Usage

```javascript
// proof.config.js
import ConsolePlugin from '@proof/console-plugin';

export default {
  plugins: [new ConsolePlugin()]
};
```
