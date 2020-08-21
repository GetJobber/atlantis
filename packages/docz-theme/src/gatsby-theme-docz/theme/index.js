import themeStyles from "gatsby-theme-docz/src/theme/index";
import { merge } from "lodash/fp";
import * as modes from "./modes";

// eslint-disable-next-line import/no-default-export
export default merge(themeStyles, {
  colors: {
    ...modes.jobber,
  },
  fontSizes: [
    "var(--typography--fontSize-smaller)",
    "var(--typography--fontSize-small)",
    "var(--typography--fontSize-base)",
    "var(--typography--fontSize-large)",
    "var(--typography--fontSize-larger)",
    "var(--typography--fontSize-largest)",
    "var(--typography--fontSize-jumbo)",
    "var(--typography--fontSize-extravagant)",
  ],
  space: [
    "var(--space-minuscule)",
    "var(--space-smallest)",
    "var(--space-smaller)",
    "var(--space-small)",
    "var(--space-base)",
    "var(--space-large)",
    "var(--space-larger)",
    "var(--space-largest)",
    "var(--space-extravagant)",
  ],
  radii: {
    square: "var(--radius-base)",
    radius: "var(--radius-large)",
    rounded: "var(--radius-larger)",
  },
});
