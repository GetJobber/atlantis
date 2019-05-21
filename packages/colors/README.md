# 🔱 Colours

> Colours for the Jobber Atlantis Design System

## Installation

To install this package into your project with [npm](https://www.npmjs.com/)
run:

```sh
npm install @jobber/colors
```

Or with [Yarn](https://yarnpkg.com/en/) run:

```sh
yarn add @jobber/colors
```

## Usage

`@jobber/colors` ships `colors.js`, `colors.json` and `colors.css` to allow
flexibility in how colors are consumed.

Import the `@jobber/colors` stylesheet into your own css

```css
@import "~@jobber/colors/colors.css";

.myLabel {
  color: var(--color-blue);
}
```

Import `@jobber/colors` directly into javascript

```js
import colors from "@jobber/colors";

console.log(
  "Color grey blue lightest is my favortie",
  colors.customProperties["--color-greyBlue--lightest"]
);
```

Inject `@jobber/colors` into your css with `postcss`

```js
module.exports = {
  plugins: [
    require("postcss-preset-env")({
      importFrom: ["@jobber/colors"]
    })
  ]
};
```
