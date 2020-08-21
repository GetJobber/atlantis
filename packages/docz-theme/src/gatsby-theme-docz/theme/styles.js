import themeStyles from "gatsby-theme-docz/src/theme/styles";
import { merge } from "lodash/fp";

// eslint-disable-next-line import/no-default-export
export default merge(themeStyles, {
  Container: {
    maxWidth: 960,
  },
  a: {
    color: "green",

    ":hover": {
      textDecoration: "none",
      color: "greenDark",
    },
  },
  blockquote: {
    my: 5,
    py: 4,
    px: 5,
    borderRadius: "square",
    borderLeft: t => `var(--space-small) solid ${t.colors.blockquote.border}`,
  },
});
