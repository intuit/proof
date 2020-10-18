# Creating a new `Proof` plugin

This document describes how a new plugin can be created for `proof`, added
to the list of plugins and operate within the lifecycle of `proof`.

`proof` itself is built using Webpack's [Tapable](https://github.com/webpack/tapable) library.
Tapable exposes extension points (called hooks) for Webpack plugin system, so that any point
of the build life-cycle can be tapped (read intercepted) and additional functionality provided
as per the needs of the project.

Note that `proof` is written in [Typescript](https://www.typescriptlang.org/) and hence, makes 
use of concepts such as [interface](https://www.typescriptlang.org/docs/handbook/interfaces.html).
If you are unfamiliar with these, please take a look at Typescript documentation before going 
ahead.

# First step: Hello World

Let's see what is the most basic plugin that we can write for `proof`. Hello World has been the
defacto standard to introduce anything new in softwares, so here we go:

```js
import Proof, { ProofPlugin } from '@proof-ui/core';

export default class HelloWorldPlugin implements ProofPlugin {

  public apply(proof: Proof) {
    proof.hooks.start.tap('my-plugin', () => {
      console.log('Hello World!');
    });
  }

}
```

The `import` statement above imports `Proof` as well as the `ProofPlugin` from the `core` module
of `proof`. All plugins that want to extend `proof` must implement the interface [ProofPlugin](https://github.com/intuit/proof/blob/master/packages/core/src/main.ts#L20).
`Proof` is required when using Typescript to strongly type the variable being passed to the plugin. 
