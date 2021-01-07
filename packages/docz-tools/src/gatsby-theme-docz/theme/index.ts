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
      lineHeight: "large",
    },
    a: {
      color: "green",
      textDecoration: "none",
      transition: "color 300ms",

      "&:hover": {
        color: "greenDark",
      },
    },
    ul: {
      pl: "large",
      my: "base",
    },
    li: {
      my: "smaller",
    },
    blockquote: {
      bg: "greyLightest",
      my: "large",
      mx: 0,
      py: "base",
      pl: "large",
      borderLeft: "var(--border-thicker) solid",
      borderColor: "greyBlueLighter",
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
