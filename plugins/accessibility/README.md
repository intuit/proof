# @proof-ui/a11y-plugin

Uses [`axe`](https://www.deque.com/axe/) to scan each story against accessibility rules. Violatons are printed to the console, and included in any reports.

## Installation

```bash
yarn add -D @proof-ui/a11y-plugin
```

## Usage

```javascript
// proof.config.js
import A11yPlugin from '@proof-ui/a11y-plugin';

export default {
  plugins: [
    new A11yPlugin({
      // Configuration
    })
  ]
};
```

```bash
# Command Line Usage
proof --a11y
```

## Options

You can configure the A11yPlugin through some options in it's constructor:

| Property | Description                                                  | Type                                                                                          | Default   |
| -------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------- | --------- |
| `config` | The AXE rule configuration to use when testing a story       | `object` (see [`axe.Spec`](https://github.com/dequelabs/axe-core/blob/develop/axe.d.ts#L118)) |           |
| `root`   | A selector for the root context when checking for violations | `string`                                                                                      | `'#root'` |

## Related

- [add-all-plugin](./add-all)
- [skip-tests-plugin](./skip-tests)
