# Design

Foundational colors, styling and design tokens for the Jobber Atlantis Design
System

## Installation

```sh
npm install @jobber/design
```

## Usage

`@jobber/design` ships `foundation.css`. It also provides utilities for getting
an icon svg path, and icon styles as a JS object for use in a React `style`
attribute. We also ship a dark mode as both individual tokens (dark.theme.css)
and a full theme file (dark.mode.css). We ship our semantic styles as well
`semantic.css`

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
`design/foundation` in every css files that needs it. Soon, this manual approach
will be replaced by a ThemeProvider.

#### icons

Import the `getIcon` utility into your JavaScript/Typescript file

```tsx
import { getIcon } from "@jobber/design";

const { svgStyle, paths, viewBox } = getIcon({
  name: "dashboard",
  color: "green",
  size: "large",
  platform: "web",
});
```

You can also get the type definitions for `IconNames`, `IconColorNames`, and
`IconSizes` from `@jobber/design`

```tsx
import type { IconNames, IconColorNames, IconSizes } from "@jobber/design";
```

If you need the actual js style files for icons, you can import them from
`@jobber/design/icons`. You may not need these files for the web but they might
be required for React Native

```css
@import "@jobber/design/foundation.css";
@import {iconStyles, iconSizes, iconColors} from "@jobber/design";
```

### PostCSS

Inject `@jobber/foundation` into your css with `postcss`

```js
module.exports = {
  plugins: [
    require("postcss-preset-env")({
      importFrom: ["@jobber/design/dist/foundation.css"],
    }),
  ],
};
```

## Usage With React Native

To use `tokens` with React Native, add the following to the file containing your
project's global styling:

```ts
import { tokens, androidTokens, iosTokens } from "@jobber/design";
import { Platform } from "react-native";

export const tokens: typeof AndroidTokens = Platform.select({
  ios: () => iosTokens,
  android: () => androidTokens,
  default: () => androidTokens,
})();

export const GlobalStyling = {
  ...tokens,
  ...otherStyles,
};
```

## Adding a new set of tokens

1. Adding a new token file under `src/tokens` that follows the same format as
   above and in the other files (platformOverrides is a special file and should
   not be copied).
1. Importing your new token file in `allTokens.ts` and adding it to the tokenMap
   in the same file.
1. At this point, your token contents should start showing up in all the built
   output via `npm run build` in the design package (or just `npm install` from
   the root of the project)

## For How The Platform Works see HOWTHISWORKS.md
