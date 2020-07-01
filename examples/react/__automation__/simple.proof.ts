import { proofsOf } from '@proof-ui/test';
import assert from 'power-assert';

const proofs = proofsOf('Components|Button');

proofs.add('Basic', async ({ browser }) => {
  const value = await (await browser.$('#clicky-button')).getText();
  assert(value === 'Click Me');
});
