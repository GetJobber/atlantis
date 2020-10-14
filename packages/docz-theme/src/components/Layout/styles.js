import { media } from "gatsby-theme-docz/src/theme/breakpoints";

export const main = {
  boxSizing: "border-box",
  display: "grid",
  gridTemplateColumns: t => `${t.sidebarWidth || 300}px 1fr`,
  minHeight: "100vh",

  [media.tablet]: {
    display: "block",
  },

  "*, *::before, *::after": {
    boxSizing: "inherit",
  },
};
