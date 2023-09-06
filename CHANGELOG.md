# v0.3.6 (Wed Sep 06 2023)

#### 🐛 Bug Fix

- `@proof-ui/browser`, `@proof-ui/test`, `@proof-ui/image-snapshot-plugin`
  - Version bump selenium-standalone [#83](https://github.com/intuit/proof/pull/83) (thomas_marmer@intuit.com)

#### Authors: 1

- Thomas Marmer ([@tmarmer](https://github.com/tmarmer))

---

# v0.3.5 (Mon Oct 24 2022)

#### 🐛 Bug Fix

- `@proof-ui/applitools-plugin`
  - Force applitools tests to run sequentially to adhere to concurrency limit [#81](https://github.com/intuit/proof/pull/81) (thomas_marmer@intuit.com)

#### Authors: 1

- Thomas Marmer ([@tmarmer](https://github.com/tmarmer))

---

# v0.3.4 (Thu Oct 20 2022)

#### 🐛 Bug Fix

- `@proof-ui/applitools-plugin`
  - Expose enabled flag on applitools plugin [#80](https://github.com/intuit/proof/pull/80) (thomas_marmer@intuit.com)

#### Authors: 1

- Thomas Marmer ([@tmarmer](https://github.com/tmarmer))

---

# v0.3.3 (Wed Oct 19 2022)

#### 🐛 Bug Fix

- `@proof-ui/browser`
  - Fixed an issue where non headless browsers would throw errors [#79](https://github.com/intuit/proof/pull/79) (thomas_marmer@intuit.com)

#### Authors: 1

- Thomas Marmer ([@tmarmer](https://github.com/tmarmer))

---

# v0.3.2 (Thu Oct 13 2022)

#### 🐛 Bug Fix

- `@proof-ui/browser`, `@proof-ui/logger`, `@proof-ui/applitools-plugin`
  - Allow applitools to resize browser using capabilities [#78](https://github.com/intuit/proof/pull/78) (thomas_marmer@intuit.com)

#### Authors: 1

- Thomas Marmer ([@tmarmer](https://github.com/tmarmer))

---

# v0.3.1 (Wed Oct 12 2022)

#### 🐛 Bug Fix

- `@proof-ui/applitools-plugin`
  - Preemptively resize browser in ApplitoolsPlugin [#77](https://github.com/intuit/proof/pull/77) (thomas_marmer@intuit.com)

#### Authors: 1

- Thomas Marmer ([@tmarmer](https://github.com/tmarmer))

---

# v0.3.0 (Wed Jul 27 2022)

#### 🚀 Enhancement

- `@proof-ui/browser`, `@proof-ui/cli`, `@proof-ui/core`, `@proof-ui/test`, `@proof-ui/applitools-plugin`, `@proof-ui/image-snapshot-plugin`, `@proof-ui/junit-plugin`
  - Update core dependencies [#76](https://github.com/intuit/proof/pull/76) (thomas_marmer@intuit.com)

#### ⚠️ Pushed to `master`

- [skip CI] update readme ([@adierkens](https://github.com/adierkens))

#### Authors: 2

- Adam Dierkens ([@adierkens](https://github.com/adierkens))
- Thomas Marmer ([@tmarmer](https://github.com/tmarmer))

---

# v0.2.1 (Tue May 18 2021)

#### 🐛 Bug Fix

- Try to debug the build [#75](https://github.com/intuit/proof/pull/75) ([@adierkens](https://github.com/adierkens))
- Bump auto [#74](https://github.com/intuit/proof/pull/74) ([@adierkens](https://github.com/adierkens))
- `@proof-ui/config`
  - Change log to debug [#73](https://github.com/intuit/proof/pull/73) ([@adierkens](https://github.com/adierkens))
- `@proof-ui/browser`
  - fix deserialize instance of `java.lang.String` error [#72](https://github.com/intuit/proof/pull/72) ([@kendallgassner](https://github.com/kendallgassner))

#### ⚠️ Pushed to `master`

- Update config.yml ([@adierkens](https://github.com/adierkens))

#### Authors: 2

- Adam Dierkens ([@adierkens](https://github.com/adierkens))
- Kendall Gassner ([@kendallgassner](https://github.com/kendallgassner))

---

# v0.2.0 (Fri Dec 18 2020)

#### 🚀 Enhancement

- `@proof-ui/image-snapshot-plugin`
  - Proof image snapshot plugin. [#69](https://github.com/intuit/proof/pull/69) ([@hainessss](https://github.com/hainessss))

#### Authors: 1

- [@hainessss](https://github.com/hainessss)

---

# v0.1.6 (Wed Dec 02 2020)

#### 🐛 Bug Fix

- Test out PR builds [#1](https://github.com/intuit/proof/pull/1) ([@adierkens](https://github.com/adierkens) [@hipstersmoothie](https://github.com/hipstersmoothie))
- `@proof-ui/cli`, `@proof-ui/config`
  - Fix loading of custom config files [#71](https://github.com/intuit/proof/pull/71) ([@adierkens](https://github.com/adierkens))

#### 📝 Documentation

- Fix #63: Document writing custom plugins [#67](https://github.com/intuit/proof/pull/67) ([@nsinghal12](https://github.com/nsinghal12))
- Fix #3: Add hooks documentation [#68](https://github.com/intuit/proof/pull/68) ([@nsinghal12](https://github.com/nsinghal12))
- Adding Badges in README.md [#64](https://github.com/intuit/proof/pull/64) ([@akashprasher](https://github.com/akashprasher))

#### Authors: 4

- Adam Dierkens ([@adierkens](https://github.com/adierkens))
- Akash Prasher ([@akashprasher](https://github.com/akashprasher))
- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))
- Niti ([@nsinghal12](https://github.com/nsinghal12))

---

# v0.1.5 (Thu Aug 20 2020)

#### 🐛 Bug Fix

- `@proof-ui/browser`, `@proof-ui/core`
  - move switchToFrame to getStories [#55](https://github.com/intuit/proof/pull/55) ([@hainessss](https://github.com/hainessss))

#### Authors: 1

- [@hainessss](https://github.com/hainessss)

---

# v0.1.4 (Tue Aug 11 2020)

#### 🐛 Bug Fix

- `@proof-ui/applitools-plugin`
  - Add dep for selenium-webdriver (used by applitools) [#53](https://github.com/intuit/proof/pull/53) ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.1.3 (Tue Aug 11 2020)

#### 🐛 Bug Fix

- `@proof-ui/config`, `@proof-ui/applitools-plugin`
  - Update applitools version in the plugin [#52](https://github.com/intuit/proof/pull/52) ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.1.2 (Tue Aug 11 2020)

#### 🐛 Bug Fix

- `@proof-ui/browser`
  - Fix headless chrome arguments for `--headless` flag [#51](https://github.com/intuit/proof/pull/51) ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.1.1 (Mon Jul 06 2020)

#### 🐛 Bug Fix

- `@proof-ui/browser`, `@proof-ui/cli`
  - WDIO 6.0 Fixes [#50](https://github.com/intuit/proof/pull/50) ([@adierkens](https://github.com/adierkens))

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

- `@proof-ui/browser`, `@proof-ui/cli-plugin`, `@proof-ui/cli`, `@proof-ui/config`, `@proof-ui/core`, `@proof-ui/logger`, `@proof-ui/test`, `@proof-ui/utils`, `@proof-ui/a11y-plugin`, `@proof-ui/add-all-plugin`, `@proof-ui/applitools-plugin`, `@proof-ui/babel-plugin`, `@proof-ui/console-plugin`, `@proof-ui/junit-plugin`, `@proof-ui/skip-tests-plugin`
  - webdriverio upgrade [#36](https://github.com/intuit/proof/pull/36) ([@adierkens](https://github.com/adierkens))

#### 🐛 Bug Fix

- Freeze lockfile when releasing [#49](https://github.com/intuit/proof/pull/49) ([@adierkens](https://github.com/adierkens))
- Remove legacy auto flag [#48](https://github.com/intuit/proof/pull/48) ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.0.20-0 (Fri Jun 19 2020)

#### 🚧 Prerelease

- `@proof-ui/applitools-plugin`
  - Update applitools version [#47](https://github.com/intuit/proof/pull/47) ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.0.19 (Wed Jun 03 2020)

#### 🐛  Bug Fix

- `@proof-ui/storybook`
  - Use ES5 as target for storybook plugin [#46](https://github.com/intuit/proof/pull/46) ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.0.18 (Tue Jun 02 2020)

#### 🐛  Bug Fix

- `@proof-ui/browser`
  - pass port to localgrid.start [#45](https://github.com/intuit/proof/pull/45) ([@hainessss](https://github.com/hainessss))

#### ⚠️  Pushed to master

- run tests serially  (Adam_Dierkens@intuit.com)
- remove codecov line  (Adam_Dierkens@intuit.com)

#### Authors: 2

- [@hainessss](https://github.com/hainessss)
- Adam Dierkens (Adam_Dierkens@intuit.com)

---

# v0.0.17 (Wed Apr 15 2020)

#### 🐛  Bug Fix

- `@proof-ui/applitools-plugin`
  - Use Configuration object from eyes.webdriver [#43](https://github.com/intuit/proof/pull/43) ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.0.16 (Thu Apr 09 2020)

#### 🐛  Bug Fix

- `@proof-ui/applitools-plugin`
  - use cpy-cli for consistency across platforms [#40](https://github.com/intuit/proof/pull/40) ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.15 (Thu Apr 09 2020)

#### 🐛  Bug Fix

- `@proof-ui/applitools-plugin`
  - move types after build for consistency [#39](https://github.com/intuit/proof/pull/39) ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.14 (Thu Apr 09 2020)

#### 🐛  Bug Fix

- `@proof-ui/applitools-plugin`
  - add more types [#38](https://github.com/intuit/proof/pull/38) ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.13 (Wed Apr 08 2020)

#### 🐛  Bug Fix

- Publish docs on merge to master [#34](https://github.com/intuit/proof/pull/34) ([@adierkens](https://github.com/adierkens))
- `@proof-ui/applitools-plugin`
  - copy extra types to dist during publish [#37](https://github.com/intuit/proof/pull/37) ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### ⚠️  Pushed to master

- Fix indentation  ([@adierkens](https://github.com/adierkens))

#### Authors: 2

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))
- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.0.12 (Wed Jan 08 2020)

#### 🐛  Bug Fix

- `@proof-ui/core`
  - Wait longer for browser preview [#33](https://github.com/intuit/proof/pull/33) ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.0.11 (Wed Jan 08 2020)

#### 🐛  Bug Fix

- Swap to circle [#32](https://github.com/intuit/proof/pull/32) ([@adierkens](https://github.com/adierkens))
- Fix ci-skip github action [#30](https://github.com/intuit/proof/pull/30) ([@DrSensor](https://github.com/DrSensor))

#### ⚠️  Pushed to master

- Require test and lint  ([@adierkens](https://github.com/adierkens))
- Swap to yarn  ([@adierkens](https://github.com/adierkens))
- Use yarn.lock for cache key  ([@adierkens](https://github.com/adierkens))

#### Authors: 2

- Adam Dierkens ([@adierkens](https://github.com/adierkens))
- Fahmi Akbar Wildana ([@DrSensor](https://github.com/DrSensor))

---

# v0.0.10 (Wed Oct 23 2019)

#### 🐛  Bug Fix

- `@proof-ui/a11y-plugin`, `@proof-ui/add-all-plugin`, `@proof-ui/applitools-plugin`, `@proof-ui/babel-plugin`, `@proof-ui/console-plugin`, `@proof-ui/junit-plugin`, `@proof-ui/skip-tests-plugin`
  - links don't work in peers [#31](https://github.com/intuit/proof/pull/31) ([@hipstersmoothie](https://github.com/hipstersmoothie))

#### Authors: 1

- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))

---

# v0.0.9 (Thu Oct 17 2019)

#### 🐛  Bug Fix

- `@proof-ui/browser`
  - Wait for Root To Exist [#29](https://github.com/intuit/proof/pull/29) ([@tylerkrupicka](https://github.com/tylerkrupicka))

#### Authors: 1

- Tyler Krupicka ([@tylerkrupicka](https://github.com/tylerkrupicka))

---

# v0.0.8 (Thu Oct 17 2019)

#### 🐛  Bug Fix

- Add pull request gh action [#11](https://github.com/intuit/proof/pull/11) ([@adierkens](https://github.com/adierkens))
- `@proof-ui/browser`, `@proof-ui/core`
  - move webdriveio to dependency [#28](https://github.com/intuit/proof/pull/28) (haihua_wu@intuit.com [@adierkens](https://github.com/adierkens))
- `@proof-ui/a11y-plugin`
  - Issue 8 fix enabling default accessibility config [#24](https://github.com/intuit/proof/pull/24) ([@adierkens](https://github.com/adierkens))

#### 📝  Documentation

- Add contributing setup info to the README #13 [#14](https://github.com/intuit/proof/pull/14) ([@digikin](https://github.com/digikin))
- `@proof-ui/a11y-plugin`
  - Build docs site from plugin READMEs [#23](https://github.com/intuit/proof/pull/23) ([@adierkens](https://github.com/adierkens))
- `@proof-ui/test`, `@proof-ui/skip-tests-plugin`
  - Create README.md files for skip-tests plugin and test package [#15](https://github.com/intuit/proof/pull/15) ([@adierkens](https://github.com/adierkens))
- `@proof-ui/junit-plugin`
  - Create README.md for junit plugin [#16](https://github.com/intuit/proof/pull/16) ([@adierkens](https://github.com/adierkens))
- `@proof-ui/console-plugin`
  - added README.md file for console plugin [#17](https://github.com/intuit/proof/pull/17) ([@adierkens](https://github.com/adierkens))
- `@proof-ui/babel-plugin`
  - added README.md file for babel plugin [#18](https://github.com/intuit/proof/pull/18) ([@adierkens](https://github.com/adierkens))
- `@proof-ui/config`
  - Create README.md for config [#19](https://github.com/intuit/proof/pull/19) ([@adierkens](https://github.com/adierkens))
- `@proof-ui/applitools-plugin`
  - Added README.md for applitools plugin [#20](https://github.com/intuit/proof/pull/20) ([@adierkens](https://github.com/adierkens))
- `@proof-ui/add-all-plugin`
  - Added README.md for add-all plugin [#21](https://github.com/intuit/proof/pull/21) ([@adierkens](https://github.com/adierkens))

#### Authors: 3

- Adam Dierkens ([@adierkens](https://github.com/adierkens))
- Eric Stumbo ([@digikin](https://github.com/digikin))
- hwu3 (haihua_wu@intuit.com)

---

# v0.0.7 (Sat Oct 05 2019)

#### 🐛  Bug Fix

- `@proof-ui/applitools-plugin`
  - Decrease memory footprint of the applitools plugin [#10](https://github.com/intuit/proof/pull/10) ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.0.6 (Tue Sep 24 2019)

#### 🐛  Bug Fix

- Add a code of conduct and license file [#4](https://github.com/intuit/proof/pull/4) ([@adierkens](https://github.com/adierkens))
- `@proof-ui/browser`
  - Add hook for capabilities [#6](https://github.com/intuit/proof/pull/6) ([@adierkens](https://github.com/adierkens))

#### 📝  Documentation

- fix applitools docs [#5](https://github.com/intuit/proof/pull/5) (tylerkrupicka@gmail.com)

#### Authors: 2

- Adam Dierkens ([@adierkens](https://github.com/adierkens))
- Tyler Krupicka (tylerkrupicka@gmail.com)

---

# v0.0.5 (Tue Sep 24 2019)

#### ⚠️  Pushed to master

- add gh info  (Adam_Dierkens@intuit.com)

#### Authors: 1

- Adam Dierkens (Adam_Dierkens@intuit.com)

---

# v0.0.4 (Tue Sep 24 2019)

#### ⚠️  Pushed to master

- rename to proof-ui  (Adam_Dierkens@intuit.com)

#### Authors: 1

- Adam Dierkens (Adam_Dierkens@intuit.com)

---

# v0.0.3 (Tue Sep 24 2019)

#### ⚠️  Pushed to master

- Install before deploy  (Adam_Dierkens@intuit.com)

#### Authors: 1

- Adam Dierkens (Adam_Dierkens@intuit.com)

---

# v0.0.2 (Tue Sep 24 2019)

#### 🐛  Bug Fix

- publish docs on master [#2](https://github.com/intuit/proof/pull/2) ([@adierkens](https://github.com/adierkens))

#### Authors: 1

- Adam Dierkens ([@adierkens](https://github.com/adierkens))

---

# v0.0.1 (Tue Sep 24 2019)

#### 🐛  Bug Fix

- `@proof-ui/browser`, `@proof-ui/cli-plugin`, `@proof-ui/cli`, `@proof-ui/config`, `@proof-ui/core`, `@proof-ui/logger`, `@proof-ui/storybook`, `@proof-ui/test`, `@proof-ui/utils`, `@proof-ui/a11y-plugin`, `@proof-ui/add-all-plugin`, `@proof-ui/applitools-plugin`, `@proof-ui/babel-plugin`, `@proof-ui/console-plugin`, `@proof-ui/junit-plugin`, `@proof-ui/skip-tests-plugin`
  - Test out PR builds [#1](https://github.com/intuit/proof/pull/1) ([@adierkens](https://github.com/adierkens) [@hipstersmoothie](https://github.com/hipstersmoothie))

#### ⚠️  Pushed to master

- Add github actions  ([@adierkens](https://github.com/adierkens))
- `@proof-ui/browser`, `@proof-ui/cli-plugin`, `@proof-ui/cli`, `@proof-ui/config`, `@proof-ui/core`, `@proof-ui/logger`, `@proof-ui/storybook`, `@proof-ui/test`, `@proof-ui/utils`, `@proof-ui/a11y-plugin`, `@proof-ui/add-all-plugin`, `@proof-ui/applitools-plugin`, `@proof-ui/babel-plugin`, `@proof-ui/console-plugin`, `@proof-ui/junit-plugin`, `@proof-ui/skip-tests-plugin`
  - Rename to proof-ui  ([@adierkens](https://github.com/adierkens))

#### Authors: 2

- Adam Dierkens ([@adierkens](https://github.com/adierkens))
- Andrew Lisowski ([@hipstersmoothie](https://github.com/hipstersmoothie))