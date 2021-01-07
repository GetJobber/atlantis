import * as colors from "./colors";
import { space } from "./space";
import { fontSizes, fonts, lineHeights } from "./typography";
import { radii } from "./radii";

export default {
  colors,
  fonts,
  fontSizes,
  lineHeights,
  space,
  radii,
  styles: {
    root: {
      fontFamily: "body",
      fontSize: "large",
      lineHeight: "base",
    },
    blockquote: {
      bg: "greyLightest",
      my: "large",
      mx: 0,
      py: "base",
      pl: "large",
      borderLeft: "var(--border-thicker) solid",
      borderColor: "greyBlueLightest",
      borderRadius: "base",
      lineHeight: "large",
      fontStyle: "italic",
      color: "greyBlue",

      "> p": {
        m: 0,
      },
    },
  },
};
