# Hooks

Below is a list of all the hooks that are available for a `proof` plugin to tap into:

| Hook Name       | Description                                         | Signature                              | Reference       |
|-----------------|-----------------------------------------------------|----------------------------------------|-----------------|
| start           | Called when the plugin starts/loads                 | `()`                                   |                 |
| end             | Called when the plugin stops/ends                   | `(results: SuiteResult)`               |                 |
| tests           | Called when all tests have been loaded by proof     | `(tests: FoundTest[])`                 | [FoundTest](https://github.com/intuit/proof/blob/42aa0d3e85182b981bec61c2a44674537ed893f7/packages/core/src/runner.ts#L8) |
| testStart       | Called before/after the test is executed            | `(t: ProofTest)`                       |                 |
| testFinish      | Called when a each test finishes                    | `(t: TestResult)`                      |                 |
| stories         | Called when the story book is loaded                | `(actualStories: Storybook)`           |                 |
| testRunner      | Called when                                         | `(runner)`                             |                 |

Hooks available on the [ProofTest](https://github.com/intuit/proof/blob/42aa0d3e85182b981bec61c2a44674537ed893f7/packages/core/src/proof-test.ts#L16) object:

| Hook Name       | Description                                         | Signature                                    | Reference       |
|-----------------|-----------------------------------------------------|----------------------------------------------|-----------------|
| beforeExecute   | Called before the test actually gets executed       | `(_test: TestCallback, args: TestHookArgs)`  |                 |
| testFunction    | Tap to alter the test execution itself              | `()`                                         |                 |
| afterExecute    | Called after the test execution completes           | `(testArgs: TestHookArgs)`                   |                 |

Hooks available on the [TestRunner](https://github.com/intuit/proof/blob/42aa0d3e85182b981bec61c2a44674537ed893f7/packages/core/src/runner.ts#L14) object:

| Hook Name       | Description                                         | Signature                                    | Reference       |
|-----------------|-----------------------------------------------------|----------------------------------------------|-----------------|
| files           | Called when all files are loaded by the babel       | `(files: string[])`                          |                 |
