<h1 align="center">
  <img width="400" alt="proof" src="./packages/docs/src/media/proof.color.text.svg"/>
</h1>

Storybook is a great tool for developing components -- and while simulated and snapshot based testing can get you _pretty_ far, there's no substitution for the real thing. `proof` is a tapable integration testing library for your stories.

## Usage

The quickest way to get started is to use the proof-cli.

```
npm i --save-dev @proof-ui/cli
```

Inspired by [ava](https://github.com/avajs/ava) proof exposes a concise API for authoring tests:

```javascript
import test, { assert } from '@proof-ui/test';

test({ kind: 'Components|Button', story: 'Basic' }, async ({ browser }) => {
  // Use the browser object to test your component
  assert(true === true);
});
```

Or mirror storybook to make it easy to cross-reference tests between files.

```javascript
import { proofsOf, assert } from '@proof-ui/test';

const proofs = proofsOf('Components|Button');

proofs.add('Basic', async ({ browser }) => {
  // Use the browser object to test your component
  assert(true === true);
});
```

Proof ships with [power-assert](https://github.com/power-assert-js/power-assert) out of the box -- but feel free to bring your own assertion library to the mix.

### Running your tests

Add proof as a test script in your `package.json`

```javascript
{
  "scripts": {
    "test": "proof"
  }
}
```

And call it

```bash
npm test
```

Proof will run against a local chrome instance by default, but can be configured to target any number of local, remote, or headless browsers.

## Configuration

Create a `proof.config.js` file in your package's root folder or use the `-c`, `--conf` option on the command line to specify a different one.

## Plugins

At it's core, `proof` uses [tapable](https://github.com/webpack/tapable) and exposes many hooks to allow complete control over the entire test life-cycle.

---

## Contributing and Usage

Please read the [contributing](CONTRIBUTING.md) and [code of conduct](CODE_OF_CONDUCT.md) document.

Clone the repo:

```
git clone https://github.com/intuit/proof.git
```

Go to the newly cloned repo, and download dependencies:

```
cd proof
yarn
```

Build the project:

```
yarn build
```
