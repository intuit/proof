import proof from '@proof-ui/test';
import jestExpect from 'expect';

proof(
  { kind: 'Components|Button', story: 'Basic', name: 'Alt API' },
  async ({ browser }) => {
    const value = await (await browser.$('#clicky-button')).getText();
    jestExpect(value).toBe('Click Me');
  }
);
