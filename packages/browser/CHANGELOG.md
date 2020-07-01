# v0.1.0 (Wed Jul 01 2020)

### Release Notes

_From #36_

**🔥 Breaking 🔥**
* Upgrades webdriverio to version 6 (up from 4). This includes changing the API for the `browser` object passed to tests. See https://v6.webdriver.io/ for API changes. 
* Removes the `@proof-ui/storybook` package and the configuration step. Stories are now gathered using storybook directly; and no changes or registration code is required from clients to run tests.
* Removes the inclusion of `power-assert` in favor of users providing their own assertion library. 

**Features**

* Add ability to change the name of the tests using the `test()` API. 


#### Internal Changes

- Updates all dependencies to latest versions
- Swap `xo` to `eslint`

Fixes #26 
Fixes #27

**Canary Release** - `0.0.21-canary.b590b95.0`

---

#### 🔨 Breaking Minor Change

- webdriverio upgrade [#36](https://github.com/intuit/proof/pull/36) ([@adierkens](https://github.com/adierkens))

#### 🐛 Bug Fix

- Patch wdio loggers to proof-ui/logger ([@adierkens](https://github.com/adierkens))
- Try the update to wdio 6 ([@adierkens](https://github.com/adierkens))
- better log ([@adierkens](https://github.com/adierkens))
- Fix some storybook things ([@adierkens](https://github.com/adierkens))
- Fix wdio logger levels ([@adierkens](https://github.com/adierkens))
- Get applitools plugin working ([@adierkens](https://github.com/adierkens))
- Swap to eslint. run prettier on everything ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))
