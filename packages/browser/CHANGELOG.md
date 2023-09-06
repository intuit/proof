# v0.3.6 (Wed Sep 06 2023)

#### 🐛 Bug Fix

- Version bump selenium-standalone [#83](https://github.com/intuit/proof/pull/83) (thomas_marmer@intuit.com)
- revert webdriverio bump (thomas_marmer@intuit.com)
- version bump webdriverio and selenium-standalone (thomas_marmer@intuit.com)

#### Authors: 1

- Thomas Marmer ([@tmarmer](https://github.com/tmarmer))

---

# v0.3.3 (Wed Oct 19 2022)

#### 🐛 Bug Fix

- Fixed an issue where non headless browsers would throw errors [#79](https://github.com/intuit/proof/pull/79) (thomas_marmer@intuit.com)
- Fixed an issue where non headless browsers would throw errors (thomas_marmer@intuit.com)

#### Authors: 1

- Thomas Marmer ([@tmarmer](https://github.com/tmarmer))

---

# v0.3.2 (Thu Oct 13 2022)

#### 🐛 Bug Fix

- Allow applitools to resize browser using capabilities [#78](https://github.com/intuit/proof/pull/78) (thomas_marmer@intuit.com)
- Allow applitools to resize browser using capabilities. Fix issues with applitools test failures (thomas_marmer@intuit.com)

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

# v0.2.1 (Tue May 18 2021)

#### 🐛 Bug Fix

- fix deserialize instance of `java.lang.String` error [#72](https://github.com/intuit/proof/pull/72) ([@kendallgassner](https://github.com/kendallgassner))
- fix deserialize instance of `java.lang.String` error ([@kendallgassner](https://github.com/kendallgassner))

#### Authors: 1

- Kendall Gassner ([@kendallgassner](https://github.com/kendallgassner))

---

# v0.1.5 (Thu Aug 20 2020)

#### 🐛 Bug Fix

- move switchToFrame to getStories [#55](https://github.com/intuit/proof/pull/55) ([@hainessss](https://github.com/hainessss))
- move swith to frame to get stories ([@hainessss](https://github.com/hainessss))

#### Authors: 1

- [@hainessss](https://github.com/hainessss)

---

# v0.1.2 (Tue Aug 11 2020)

#### 🐛 Bug Fix

- Fix headless chrome arguments for `--headless` flag [#51](https://github.com/intuit/proof/pull/51) ([@adierkens](https://github.com/adierkens))
- Fix headless chrome arguments ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.1.1 (Mon Jul 06 2020)

#### 🐛 Bug Fix

- WDIO 6.0 Fixes [#50](https://github.com/intuit/proof/pull/50) ([@adierkens](https://github.com/adierkens))
- Fix iframe swap ([@adierkens](https://github.com/adierkens))
- Use browserName, browserVersion, and platformName as args ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

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

- Patch wdio loggers to proof-ui/logger ([@adierkens](https://github.com/adierkens))
- Try the update to wdio 6 ([@adierkens](https://github.com/adierkens))
- better log ([@adierkens](https://github.com/adierkens))
- Fix some storybook things ([@adierkens](https://github.com/adierkens))
- Fix wdio logger levels ([@adierkens](https://github.com/adierkens))
- Get applitools plugin working ([@adierkens](https://github.com/adierkens))
- Swap to eslint. run prettier on everything ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))
