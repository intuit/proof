# Hooks

Below is a list of all the hooks that are available for a `proof` plugin to tap into:

| Hook Name       | Description                                         | Signature                              | Reference       |
|-----------------|-----------------------------------------------------|----------------------------------------|-----------------|
| start           | Called when the plugin starts/loads                 | `()`                                   |                 |
| end             | Called when the plugin stops/ends                   | `(results: SuiteResult)`               | [SuiteResult](https://github.com/intuit/proof/blob/836f48df5cc7771a4db590d618713242b967dc49/packages/core/src/types.ts#L26) |
| tests           | Called when all tests have been loaded by proof     | `(tests: FoundTest[])`                 | [FoundTest](https://github.com/intuit/proof/blob/42aa0d3e85182b981bec61c2a44674537ed893f7/packages/core/src/runner.ts#L8) |
| testStart       | Called before/after the test is executed            | `(t: ProofTest)`                       | [ProofTest](https://github.com/intuit/proof/blob/42aa0d3e85182b981bec61c2a44674537ed893f7/packages/core/src/proof-test.ts#L16) |
| testFinish      | Called when a each test finishes                    | `(t: TestResult)`                      | [TestResult](https://github.com/intuit/proof/blob/836f48df5cc7771a4db590d618713242b967dc49/packages/core/src/types.ts#L14) |
| stories         | Called when the story book is loaded                | `(actualStories: Storybook)`           | [Storybook](https://github.com/intuit/proof/blob/42aa0d3e85182b981bec61c2a44674537ed893f7/packages/core/src/storybook.ts#L13) |
| testRunner      |                                                     | `(runner)`                             |                 |

Hooks available on the [ProofTest](https://github.com/intuit/proof/blob/42aa0d3e85182b981bec61c2a44674537ed893f7/packages/core/src/proof-test.ts#L16) object:

| Hook Name       | Description                                         | Signature                                    | Reference       |
|-----------------|-----------------------------------------------------|----------------------------------------------|-----------------|
| beforeExecute   | Called before the test actually gets executed       | `(_test: TestCallback, args: TestHookArgs)`  | [TestCallback](https://github.com/intuit/proof/blob/42aa0d3e85182b981bec61c2a44674537ed893f7/packages/test/src/types.ts#L22), [TestHookArgs](https://github.com/intuit/proof/blob/42aa0d3e85182b981bec61c2a44674537ed893f7/packages/test/src/types.ts#L9) |
| testFunction    | Tap to alter the test execution itself              | `()`                                         |                 |
| afterExecute    | Called after the test execution completes           | `(testArgs: TestHookArgs)`                   | [TestHookArgs](https://github.com/intuit/proof/blob/42aa0d3e85182b981bec61c2a44674537ed893f7/packages/test/src/types.ts#L9) |

Hooks available on the [TestRunner](https://github.com/intuit/proof/blob/42aa0d3e85182b981bec61c2a44674537ed893f7/packages/core/src/runner.ts#L14) object:

| Hook Name       | Description                                         | Signature                                    | Reference       |
|-----------------|-----------------------------------------------------|----------------------------------------------|-----------------|
| files           | Called when all files are loaded by the babel       | `(files: string[])`                          |                 |
