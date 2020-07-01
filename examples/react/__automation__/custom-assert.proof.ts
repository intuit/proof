import { proofsOf } from '@proof-ui/test';
import jestExpect from 'expect';

const proofs = proofsOf('Components|Button');

proofs.add('Complicated', async ({ browser }) => {
  const value = await (await browser.$('button')).getText();
  jestExpect(value).toBe('Click me too');
});
