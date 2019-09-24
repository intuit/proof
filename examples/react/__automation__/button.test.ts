import { proofsOf, assert } from '@proof-ui/test';

const proofs = proofsOf('Components|Button');

proofs.add('Basic', async ({ browser }) => {
  const value = await browser.element('#clicky-button').getText();
  assert(value === 'Click Me');
});
