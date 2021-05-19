# @proof-ui/image-snapshot-plugin

Provides Proof with visual regression testing capabilities by porting over functionality from (jest-image-snapshot)[https://github.com/americanexpress/jest-image-snapshot].

## Installation

```bash
yarn add -D @proof-ui/image-snapshot-plugin
```

## Usage

```javascript
// proof.config.js
import ImageSnapshotPlugin from '@proof-ui/image-snapshot-plugin';

export default {
  plugins: [
    new ImageSnapshotPlugin({
      // Configuration
    })
  ]
};
```

The image snapshot plugin closely mimics the normal react/jest snapshot testing workflow.  

Start by writing a proof snapshot test for your story. The plugin provides a method on the `browser` object that will create a snapshot for you.

```js
const proofs = proofsOf('Button');

proofs.add('Basic Usage', async ({ browser }) => {
  await browser.matchImageSnapshot();
});
```

Multipe snapshots can be taken per test.

```js
const proofs = proofsOf('Button');

proofs.add('Basic Usage', async ({ browser }) => {
  await browser.matchImageSnapshot();
  const button = await browser.$('button');
  await button.click();
  await browser.matchImageSnapshot();
});
```

The `matchImageSnapshot` method can be configured individually by passing an options parameters to the functions. It takes all the same options available to (jest-image-snapshot)[https://github.com/americanexpress/jest-image-snapshot].

```js
  await browser.matchImageSnapshot({
    failureThresholdType: 'percent',
    failureThreshold: 0.01
  });
```

It can also be configured globally:

```js
// proof.config.js

export default {
  plugins: [
    new ImageSnapshotPlugin({
      globalMatchOptions: {
        failureThreshold: 0.01,
        diffDirection: 'horizontal'
      }
    })
  ]
};
```

In addition to all the options from jest-image-snapshot. This library adds a couple more to help with proof. It adds `windowHeight`, `windowWidth`, and augments the customSnapshotIdentifier function for more nuanced snapshot naming.

```js
  await browser.matchImageSnapshot({
    windowHeight: 714,
    windowWidth: 1214,
    customSnapshotIdentifier({ currentTestName, counter }) {
      return `${this.browserName}-${currentTestName}-${this.windowWidth}x${this.windowHeight}-${counter}`;
    }
  });
```

After adding snapshot tests you can run your proof test suite as normal.

```bash
# Command Line Usage
proof
```

To update your snapshot baseline images add the `updateSnapshots` flag.

```bash
# Command Line Usage
proof --updateSnapshots
```

## Options

You can configure the ImageSnapshotPlugin through some options in it's constructor:

| Property     | Description                                                                              | Type     | Default             |
| ------------ | ---------------------------------------------------------------------------------------- | -------- | ------------------- |
| `getSnapshotsDir` |  A function that returns a string path that tells the plugin where to save image snapshots.                                                 | `function` | `() => components/${kind}/src/__image_snapshots__` |
| `globalMatchOptions` | (jest-image-snapshot)[https://github.com/americanexpress/jest-image-snapshot] options that will be applied globally. | `ImageSnapshotArgs` |  |


For ideas on how to incorporate this into your CI flow. Check out (this article)[https://baseweb.design/blog/visual-regression-testing/].