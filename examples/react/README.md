A react example of using proof

## Using the example

- Start up storybook

```
npm start
```

- Run tests

```
npm test
```

You should get a test to fail:

```
🎉  done         100.0% (1 of 1) tests finished. 100.0% (1) test failed.
🚒  error        Failures:
[Components|Button--Basic] › 🚒  error          # __automation__/button.test.ts:7

  assert(value === 'Click Me')
         |     |
         |     false
         "Click Meeeeeee"

  --- [string] 'Click Me'
  +++ [string] value
  @@ -1,8 +1,14 @@
   Click Me
  +eeeeee


 ↳ /Users/adierkens/proof/examples/react/__automation__/button.test.ts
🎉  done         Ran 1 tests in 4.83s
		- 1 failed
		- Fastest test: 1.21s (Components|Button--Basic)
		- Slowest test: 1.21s (Components|Button--Basic)
		- Mean time: 1.21s
		- Median time: 1.21s
✨  Done in 5.95s.
```

Feel free to change the code in `__automation__/button.test.ts` and re-run the tests
