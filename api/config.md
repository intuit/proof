# Configuration

The majority of the configuration for `proof` is set through the `proof.config.js` file in the root of your project.

## Options

| name        | type                               | description                                                                                                 |
| ----------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| plugins     | `array`                            | An optional array of plugins to include in the _proof_ instance. See [plugins](../plugins) for more details |
| url         | `string`                           | The default storybook URL to test against                                                                   |
| logLevel    | `info`, `debug`, `trace`, `stupid` | The default log-level to use. Any CLI option will override this                                             |
| testMath    | `glob`                             | A glob to use to look for tests. Defaults to `__automation__/**/*.test.js`                                  |
| gridOptions | `object<grid, object>`             | A set of properties to include for _any_ session created on that grid type                                  |
| waitForRoot | `number`                           | The number of milliseconds to wait for storybook to load. Defaults to 1000ms.                               |

### gridOptions

Allows you to pass in options to set on each grid type when creating a browser session. This is a global option that applies to every session.

**Example**

```javascript
{
  gridOptions: {
    remote: {
      url: 'sauce.proof.com',
      apiKey: 'foo-bar'
    }
  }
}
```

This will set the remote grid to use `sauce.proof.com` and the API key `foo-bar`. _Note_ these options will only apply if you're running the tests under this grid type. If running proofs locally (using the local-grid), these options won't be added.
