# Development Notes

## Unimplemented

### Image Mocking

In my unit tests, I originally set out to test whether A.) an image rendered onscreen at all; and B.) whether the API-rendered image matched a saved version of the expected QR code. However this was not achievable in a reasonable time frame.

#### Attempts

Usually, API calls are mocked to decouple tests from network dependencies. The goal is that tests still work even if you’re offline, the API goes down, etc. Achieving this is straightforward: you temporarily override an XHR method like `window.fetch`, [`axios`](https://github.com/axios/axios), etc. and then any time the code you’re testing makes an HTTP request, the response is predictable.

But in the case of the QR code, the API call is coming from inside the <del>house</del> `<img>`. The HTTP request is not issued directly by you, but rather by the browser whenever you set the `src`. So mocking that is not as simple as overriding an XHR method.

In an attempt to solve this, I followed a [guide](https://www.phpied.com/intercepting-new-image-src-requests/) to intercept and modify `src` changes by mocking the HTML `Image` prototype. I then injected the new `Image` into Jest’s [JSDOM](https://github.com/jsdom/jsdom) environment. The results can be seen in `src/_fake-image.js`, which is loaded via the command `react-scripts test --env ./src/_fake-image.js`, aliased as `test` in `package.json`.

In theory, this would make it so `<QR data="foo" />` would call `https://api.qrserver.com/v1/create-qr-code/?data=foo` in a production environment, and `file://test-assets/foo.png` in a testing environment.

But while this technically worked, it only worked for imperative invocations, e.g.
```js
const img = new Image();
img.src = 'foo';
```
…not declarative incovations like:
```html
<img src="foo" />
```

This is probably because writing `<img />` in a React context is writing JSX, i.e. it gets translated into a `React.createElement('img')` call, which for some reason does not reference JSDOM’s `Image` even in the Jest environment. At first I thought maybe Enzyme was the culprint, but even swapping it out for `react-test-renderer` had no effect.

And even replacing the `<img />` with `new Image()` in `QR`’s `render` function turned out to be useless, because none of the React methods seem able to convert non-JSX objects into JSX.

This could be worked around by pointing `QR.apiEndpoint` to the filesystem rather than mocking, but it is also not possible to inspect the image data without telling JSDOM to load external resources. This only works if the `canvas` dependency is installed and your `package.json` or Jest config has the following entry:
```json
"jest": {
  "testEnvironmentOptions": {
    "resources": "usable"
  }
}
```
However `jest.testEnvironmentOptions` is not supported by `create-react-app`. Since we don’t want to eject from CRA and add more complexity, I abandoned this approach.