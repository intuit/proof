# Creating a new `Proof` plugin

This document describes how a new plugin can be created for `proof`, added
to the list of plugins and operate within the lifecycle of `proof`.

`proof` itself is built using Webpack's [Tapable](https://github.com/webpack/tapable) library.
Tapable exposes extension points (called hooks) for Webpack plugin system, so that any point
of the build life-cycle can be tapped (read intercepted) and additional functionality provided
as per the needs of the project.

Note that `proof` is written in [Typescript](https://www.typescriptlang.org/) and hence, makes 
use of concepts such as [interface](https://www.typescriptlang.org/docs/handbook/interfaces.html).
If you are unfamiliar with these, please take a look at Typescript documentation before going 
ahead.

# First step: Hello World

Let's see what is the most basic plugin that we can write for `proof`. Hello World has been the
defacto standard to introduce anything new in softwares, so here we go:

```ts
import Proof, { ProofPlugin } from '@proof-ui/core';

export default class HelloWorldPlugin implements ProofPlugin {

  public apply(proof: Proof) {
    proof.hooks.start.tap('my-plugin', () => {
      console.log('Hello World!');
    });
  }

}
```

The `import` statement above imports `Proof` as well as the `ProofPlugin` from the `core` module
of `proof`. All plugins that want to extend `proof` must implement the interface [ProofPlugin](https://github.com/intuit/proof/blob/master/packages/core/src/main.ts#L20).
`Proof` is required to strongly type the variable being passed to the plugin's `apply` method.

The `ProofPlugin` requires the plugin to implement a single method called `apply`. The method argument,
`Proof` is tapable, and thus provides all lifecycle methods exposed. In the above example, we have
tapped the `start` method which is invoked when the plugin starts. We do a simple `console.log` 
to indicate that our plugin ran.

# Second step: Reporting test details after test run

`proof` is a test runner for [Storybook](https://storybook.js.org/) and thus any use of `proof`
will always include tests. When it comes to testing, any test run must present a report of what
testing was performed to be useful for any practical purpose. Imagine a test runner which failed
on a test failure, but did not indicate which test failed, or how many tests failed.

Thus, let's see how to build a simple plugin that will report that test statistics at the end
of the run. To start, let's pull our **Hello World** code from above, and create a simple
`MyConsoleReporterPlugin`. For the inquisitive such a reporter already exists in `proof` as
[ConsoleReporterPlugin](ConsoleReporterPlugin).

The purpose of each line of the code is now explained within the code block (as comments) to
make them more context-aware. 

```ts
import Proof, { ProofPlugin } from '@proof-ui/core';

/**
 * This is our custom plugin which extends from `ProofPlugin` as before.
 */
export default class MyConsoleReporterPlugin implements ProofPlugin {

  /**
   * The method that every `ProofPlugin` needs to implement
   */
  public apply(proof: Proof) {
  
    /**
     * Declare a scoped variable to store the time. This is the place
     * where we use the function methodology to define a class instance.
    let startTime:number = 0;
  
    /**
     * This is when the plugin starts. To indicate the total time spent
     * in running tests let's store the current time in a variable. This
     * can then be used later.
     */
    proof.hooks.start.tap('my-plugin', () => {
    
      /**
       * Update the time in scoped variable
       */
      startTime = Date.now();
    });
    
  }

}
```

Next, we need to know the total number of tests that are going to be executed as part of
this test run. For the same we can `tap` the `tests` method supplied by `Proof`:

```ts
public apply(proof: Proof) {

  // other code
  
  /**
   * Declare another scoped variable
   */
  let totalTestCount:number = 0;
  
  /**
   * Next we store the total number of tests from the list of all tests that were found.
   * This may differ from total number of tests in a project, depending on `proof` configuration
   * as well as the way the developer configures their tests.
   */
  proof.hooks.tests.tap('my-plugin', (tests: FoundTest[]) => {
      totalTestCount = tests.length;
    });
  }
}
```

In our very basic reporter, let's report the total number of test cases that pass/fail and the
total time spent in the execution of these tests. Let's see what tappable methods are available
to us in `proof` to achieve the same:

```ts
public apply(proof: Proof) {

  // other code
  
  let failedTests:number = 0;
  let completedTests:number = 0;

  /**
   * The `testFinish` method is called upon the completion of each test, irrespective of whether
   * it passed or failed. The `error` property on `TestResult` can be used to infer the success
   * state of a test result.
   */
  proof.hooks.testFinish.tap('my-plugin', (t: TestResult) => {
    if (t.error) {
      // increment failed tests
      failedTests += 1;
    }
    
    // total number of tests executed
    completedTests += 1;
  });
  
  /**
   * The `end` tappable is invoked when the test suite completes, that is, when all tests have
   * finished executing. In this method let's record the total time spent in executing the
   * tests. This is also the place where we can display the test results, as `end` is the last
   * tappable invoked in the plugin life-cycle.
   */
  proof.hooks.end.tap('my-plugin', (results: SuiteResult) => {
    const current = Date.now();
    const timeSpent = current - startTime;
    
    console.log('***********************************************');
    console.log('Total tests: ' + totalTestCount);
    console.log('Total tests executed: ' + completedTests);
    console.log('Time spent in testing: ' + timeSpent);
    
    console.log('Tests failed: ' + failedTests);
    console.log('Tests pass: ' + (completedTests - failedTests));
    
    console.log('***********************************************');
  });
}
```

In the above example, we learnt how to use various life-cycle methods to create a simple console
reporter plugin for `proof`. The important life-cycle methods, `start`, `end`, `tests`, and `testFinish`
are explained as well.

For a more detailed and sophisticated example, refer to the actual [ConsoleReporterPlugin](https://github.com/intuit/proof/blob/42aa0d3e85182b981bec61c2a44674537ed893f7/plugins/console/src/main.ts#L22)
