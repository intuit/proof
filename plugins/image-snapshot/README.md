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
  const result = await browser.matchImageSnapshot();
  expect(result).toBe(true);
});
```

Multipe snapshots can be taken per test.

```js
const proofs = proofsOf('Button');

proofs.add('Basic Usage', async ({ browser }) => {
  expect(await browser.matchImageSnapshot()).toBe(true);
  const button = await browser.$('button');
  await button.click();
  expect(await browser.matchImageSnapshot()).toBe(true);
});
```

The `matchImageSnapshot` method can be configured individually by passing an options parameters to the functions. It takes all the same options available to (jest-image-snapshot)[https://github.com/americanexpress/jest-image-snapshot].

```js
  expect(await browser.matchImageSnapshot({
    failureThresholdType: 'percent',
    failureThreshold: 0.01
  })).toBe(true);
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
| `imageWidth` | Width of the image saved | `number` | `1280`  |
| `imageHeight` |  Height of the image saved | `number` | `800` |
| `globalMatchOptions` | (jest-image-snapshot)[https://github.com/americanexpress/jest-image-snapshot] options that will be applied globally. | `MatchImageSnapshotOptions` |  |