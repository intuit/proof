# @proof-ui/test

Writing a test using proof is very similar to how you write your stories. Typically you'd start with:

```javascript
import { proofsOf } from '@proof-ui/test';

const proofs = proofsOf('Components|Button');
```

Look familiar? Just like when you write your stories, you can now write a _proof_ for that story to verify everything is working as expected.

While _most_ of your testing will probably occur at the unit-test using [react-testing-library](https://github.com/testing-library/react-testing-library) or similar -- there's no substitution for grabbing screenshots and running some testing in the browser (especially when you're responsible for supporting some of the more annoying browsers).

## Writing a test

Adding a _proof_ is very similar to adding a story. In the callback function, instead of returning a `react` component, you're given a `browser` object to interact with the page.

```javascript
import { proofsOf } from '@proof-ui/test';

const proofs = proofsOf('Components|Button');

proofs.add('Simple', ({ browser }) => {});
```

## API

The test callback function is passed the following:

| name    | type                                                       |
| ------- | ---------------------------------------------------------- |
| browser | A `webdriverio` [browser](http://v4.webdriver.io/api.html) |
| story   | `string`                                                   |
| kind    | `string`                                                   |

## Alternative API

To enable finer control of testing, you can also use the generic version of the test api:

```javascript
import test from '@proof-ui/test';

test({ kind: 'Components|Button', story: 'Simple' }, ({ browser }) => {});
```

The `test` api accepts a _filter_ for what stories to run the test on. It can filter on both the `kind` or `story` name -- using the same callback API as the `proofsOf` version.

If no `story` is provided, _all_ stories under that kind are executed. Similarly, if neither a `story` or `kind` are provided, the test runs against _every_ story in your storybook.
