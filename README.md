# Development Notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Naming Things
<!-- The following is phrased as if there will be future developers on the project: -->

Use <dfn><abbr>DAMP</abbr></dfn> (Descriptive And Meaningful Phrases) for variables, functions, etc. Abbreviations that have become standalone words like `param` and `config` are OK, as are counters like `i` and `j`. But otherwise, aim to decrease the cognitive load for developers reading your code, e.g. `event` over `e`, `error` over `err`, `populationData` over `data`.

## JS Style

camelCase. Do not capitalize abbreviations, e.g. `toJson` instead of `toJSON`.

## CSS Style

To prevent specificity issues, avoid tag and ID selectors unless you are styling something one-of-a-kind like `body` or `#root`.

### Built-in Elements

Follow conventional [BEM style](https://en.bem.info/methodology/naming-convention/#two-dashes-style) for anything too commonplace to warrant componentizing, like links or `code` blocks, all lowercase.

Do not chain element identifiers, and do not attach elements to modified blocks.

#### Correct

```css
.button {}
  .button--primary
  .button__text {}
  .button__text--loud {}
```

#### Incorrect

```css
.button {}
  .button__text__icon {}
  .button--primary__text {}
```

### Custom Elements

Follow BEM style with blocks rendered as UpperCamelCase, matching the name of the tag.

```css
.Block {}
  .Block--modifier
  .Block__element
  .Block__element--modifier
```

### Utility Classes

For styles with broad applicability, such as spacing/alignment, use a plain class.

```css
.utility {}
```

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