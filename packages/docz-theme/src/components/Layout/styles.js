import { media } from "gatsby-theme-docz/src/theme/breakpoints";

export const main = {
  boxSizing: "border-box",
  display: "flex",
  minHeight: "100vh",

  [media.tablet]: {
    display: "block",
  },

  "*, *::before, *::after": {
    boxSizing: "inherit",
  },
};

export const content = {
  flex: "1",
};
