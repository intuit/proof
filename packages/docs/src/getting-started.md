# Getting Started

Add the `proof` cli package

```bash
yarn add @proof-ui/cli
```

Using an existing story, add a test

```javascript
// __automation__/button.test.ts
import { proofsOf, assert } from '@proof-ui/test';

const proofs = proofsOf('Components|Button');

proofs.add('Basic', async ({ browser }) => {
  const value = await browser.element('#clicky-button').getText();
  assert(value === 'Click Me');
});
```
