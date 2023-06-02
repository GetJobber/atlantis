# Foundation

Foundational colors, styling and design tokens for the Jobber Atlantis Design
System

## Installation

```sh
npm install @jobber/design
```

## Usage

`@jobber/design` ships `foundation.css`. It also provides utilities for getting
icons svg path.

### CSS

#### Foundation

Import the `@jobber/design` stylesheet into your own css

```css
@import "~@jobber/design/foundation.css";

.myLabel {
  color: var(--color-blue);
  padding: var(--space-base);
}
```

For web, if `design/foundation.css` is already included you do not need to
import it for every css file. For React Native, you need to import
`design/foundation.css` in every css files that needs it.

#### icons

Import the `getIcon` utility into your JavaScript/Typescript file

```tsx
import { getIcon } from "@jobber/design";

const { svgClassNames, paths, viewBox } = getIcon({
  name: "dashboard",
  color: "green",
  size: "large",
});
```

You can also get the type definitions for `IconNames`, `IconColorNames`, and
`IconSizes` from `@jobber/design`

```tsx
import type { IconNames, IconColorNames, IconSizes } from "@jobber/design";
```

If you need the actual css files for icons, you can import them from
`@jobber/design/icons`. You may not need these files for the web but they might
be required for React Native

```css
@import "@jobber/design/foundation.css";
@import "@jobber/design/icons/Icon";
@import "@jobber/design/icons/Sizes";
@import "@jobber/design/icons/Colors";
```

### PostCSS

Inject `@jobber/foundation` into your css with `postcss`

```js
module.exports = {
  plugins: [
    require("postcss-preset-env")({
      importFrom: ["@jobber/design"],
    }),
  ],
};
```

## Usage With React Native

To use `tokens` with React Native, add the following to the file containing your
project's global styling:

```ts
// Import from `foundation.native` instead of `foundation` because foundation
// would resolve the typescript for the web foundation instead of the React Native version.
import { tokens as mobileFoundationBase } from "@jobber/design/foundation.native";
import { Platform } from "react-native";

const tokens: typeof mobileFoundationBase = Platform.select({
  ios: () => require("@jobber/design/foundation.ios").tokens,
  android: () => require("@jobber/design/foundation.android").tokens,
  default: () => require("@jobber/design/foundation.native").tokens,
})();

export const GlobalStyling = {
  ...tokens,
  ...otherStyles,
};
```
