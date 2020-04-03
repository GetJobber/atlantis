import { media } from "gatsby-theme-docz/src/theme/breakpoints";

export const buttons = {
  padding: "var(--space-base) var(--space-larger)",
  display: "flex",
  justifyContent: "flex-end",

  "& > a": {
    marginLeft: "var(--space-smaller)",
  },
};

export const menu = {
  display: "none",
  flex: "0",
  marginRight: "auto",
  marginLeft: 0,

  [media.tablet]: {
    display: "block",
  },
};
