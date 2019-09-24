# @proof-ui/cli

The `cli` package is the main entry point to interacting with the `proof` test runner.

## Options

The default cli options are listed below. Plugins are allowed to add their own command-line arguments to this list.

| name               | alias | description                                                            |
| ------------------ | ----- | ---------------------------------------------------------------------- |
| `config`           | `c`   | The location of the config file to use. Otherwise will search for one. |
| `verbose`          | `v`   | Increase the logging output. Can be repeated multiple times            |
| `test-match`       | `t`   | The glob to use when searching for tests                               |
| `url`              | `u`   | The storybook url to use                                               |
| `remote`           |       | Run the browser against a _remote_ selenium grid                       |
| `headless`         |       | Run the designated browser headlessly                                  |
| `browser-name`     |       | The name of the browser to load                                        |
| `browser-version`  |       | The version of the browser to use                                      |
| `browser-platform` |       | The name of the platform to run the browser on.                        |
| `help`             | `h`   | Print something useful                                                 |

## Examples

> **Run the basics**

```bash
proof
```

> **Run tests on proof.storybook.com on a headless chrome instance with verbose logging**

```bash
proof -vv --browser-name chrome --headless --url https://proof.storybook.com
```
