# @proof-ui/applitools-plugin

Uses [applitools](https://applitools.com/) Visual Grid to take a snapshot of your story and run a visual regression check.
It can be configured to run on may different screen-size and browser combinations.
Make sure the `APPLITOOLS_ID` environment variable is set, and that you have access to the Visual Grid beta.

## Installation

```bash
yarn add -D @proof-ui/applitools-plugin
```

## Usage

```javascript
// proof.config.js
import ApplitoolsPlugin from '@proof-ui/applitools-plugin';

export default {
  plugins: [
    new ApplitoolsPlugin({
      // Configuration
    })
  ]
};
```

```bash
# Command Line Usage
proof --visual
```

Optionally set the test batch name

```bash
# Easilly track down test results by setting the PR number in the batch-name
proof --visual --visual-batch-name 'PR #112'
```

Run visual diffs against _every_ story, even if no tests are written for one, requires the [add-all-plugin](./add-all)

```bash
# Every story will be visually tested
proof --visual --add-all
```

## Options

You can configure the applitools-plugin through some options in it's constructor:

| Property    | Description                                                                                                                                                              | Type                                                                                                                               | Default |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `delay`     | Time (in ms) to wait before taking a screen-shot. Useful for making sure images are loaded, and animations are complete.                                                 | `number` (ms)                                                                                                                      | 1000    |
| `configure` | A function used to configure the screen size and browser combinations for use in testing. Accepts a single argument, an instance of an applitools `Configuration` object | `function` see [`Configuration`](https://applitools.com/docs/api/eyes-sdk/index-gen/class-configuration-selenium4-javascript.html) |         |

### Example

To test a `100px` by `200px` screenshot on `Edge`:

```javascript
import ApplitoolsPlugin from '@proff/applitools-plugin';
import { BrowserType } from '@applitools/eyes-selenium';

new ApplitoolsPlugin({
  configure(configuration) {
    configuration.addBrowser(100, 200, BrowserType.EDGE);
  }
});
```

Any number of browsers or emulated-browsers can be added to the test.

See [`Configuration`](https://applitools.com/docs/api/eyes-sdk/index-gen/class-configuration-selenium4-javascript.html) for more details

## Related

- [add-all-plugin](./add-all)
- [skip-tests-plugin](./skip-tests)
