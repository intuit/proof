# @proof-ui/add-all-plugin

A plugin to add an empty test for each untested storybook story.

Especially powerful when combined with the [accessibility-plugin](./accessibility) or the [applitools-plugin](./applitools) to get full coverage of each story, even if there are no integration tests written already.

## Installation

```bash
yarn add -D @proof-ui/add-all-plugin
```

## Usage

```javascript
// proof.config.js
import AddAllPlugin from '@proof-ui/add-all-plugin';

export default {
  plugins: [new AddAllPlugin()]
};
```

```bash
# Command Line Usage
proof --add-all
```

## Options

You can configure the applitools-plugin through some options in it's constructor:

| Property | Description                                     | Type                                    |
| -------- | ----------------------------------------------- | --------------------------------------- |
| `filter` | A function to filter out which tests are added. | `function` - `(kind, story) => boolean` |

### Example

To add all stories except ones called `skip-me`

```javascript
import AddAllPlugin from '@proff/add-all-plugin';

new AddAllPlugin({
  filter(kind, story) {
    return story !== 'skip-me';
  }
});
```

## Related

- [accessibility-plugin](./accessibility)
- [applitools-plugin](./applitools)