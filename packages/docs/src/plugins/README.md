# Plugins

`proof` ships with a multitide of plugins available to customize the features of your tests.

The core libraries of `proof` are built using [`tapable`](https://github.com/webpack/tapable), webpack's plugin system, to allow any number of system-wide changes to be contained withing a single plugin.

## Writing a Plugin

```typescript
import Proof, { ProofPlugin } from '@proof-ui/core';

export default class HelloWorldPlugin implements ProofPlugin {
  public apply(proof: Proof) {
    proof.hooks.start.tap('my-plugin', () => {
      console.log('Hello World!');
    });
  }
}
```

## Using a Plugin

To use a plugin in your tests, simple import the plugin and add an instance of it to the `plugins` array in your `proof.config.js` configuration.

```javascript
// proof.config.js
import HelloWorldPlugin from 'my-plugin';

export default {
  plugins: [new HelloWorldPlugin()]
};
```

## Augmenting the CLI

To add additional options or arguments to the CLI. Simply add 2 more functions to your plugin:

```typescript
import Proof, { ProofPlugin } from '@proof-ui/core';

export default class HelloWorldPlugin implements ProofPlugin {
  private name = '';

  public apply(proof: Proof) {
    proof.hooks.start.tap('my-plugin', () => {
      console.log(`Hello ${this.name}`);
    });
  }

  public commands() {
    return {
      options: [
        {
          name: 'name',
          type: String
        }
      ]
    };
  }

  public setArgs(args) {
    this.name = args.name;
  }
}
```

```bash
# Now call `proof` using your new command
proof --name 'Adam'
```
