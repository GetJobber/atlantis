import * as modes from "gatsby-theme-docz/src/theme/modes";
import { merge } from "lodash/fp";
import * as colors from "./colors";

// eslint-disable-next-line import/export
export * from "gatsby-theme-docz/src/theme/modes";

// eslint-disable-next-line import/export
export const light = merge(modes.light, {
  blockquote: {
    bg: colors.greyLightest,
    border: colors.greyLight,
    color: colors.blueDark,
  },
  sidebar: {
    bg: colors.greyBlueDark,
    navGroup: colors.greyBlueLighter,
    navLink: colors.greyBlueLighter,
    navLinkActive: colors.green,
    tocLink: colors.greyBlueLighter,
    tocLinkActive: colors.white,
  },
});
