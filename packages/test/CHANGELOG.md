# v0.3.6 (Wed Sep 06 2023)

#### 🐛 Bug Fix

- Version bump selenium-standalone [#83](https://github.com/intuit/proof/pull/83) (thomas_marmer@intuit.com)
- version bump webdriverio and selenium-standalone (thomas_marmer@intuit.com)

#### Authors: 1

- Thomas Marmer ([@tmarmer](https://github.com/tmarmer))

---

# v0.3.0 (Wed Jul 27 2022)

#### 🚀 Enhancement

- Update core dependencies [#76](https://github.com/intuit/proof/pull/76) (thomas_marmer@intuit.com)

#### 🐛 Bug Fix

- Update core dependencies and fix resulting errors (thomas_marmer@intuit.com)

#### Authors: 1

- Thomas Marmer ([@tmarmer](https://github.com/tmarmer))

---

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

- Add custom test name support ([@adierkens](https://github.com/adierkens))
- No longer include power-assert ([@adierkens](https://github.com/adierkens))
- Try the update to wdio 6 ([@adierkens](https://github.com/adierkens))
- Get applitools plugin working ([@adierkens](https://github.com/adierkens))
- Swap to eslint. run prettier on everything ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))
