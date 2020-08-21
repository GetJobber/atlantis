import * as modes from "gatsby-theme-docz/src/theme/modes";
import { merge } from "lodash/fp";
import * as colors from "./colors";

export const jobber = merge(modes.light, {
  blockquote: {
    bg: colors.greyLightest,
    border: colors.greyLight,
    color: colors.blueDark,
  },
});

export * from "gatsby-theme-docz/src/theme/modes";
