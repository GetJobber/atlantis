/* eslint-disable import/no-internal-modules */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/export */

// Re-export base theme styles.
export * from "gatsby-theme-docz/src/components/NavLink/styles";

// Override what we need to.
import * as styles from "gatsby-theme-docz/src/components/NavLink/styles";

export const link = theme => ({
  ...styles.link,
  ...theme.navigation.level2,
});

export const smallLink = theme => ({
  ...styles.smallLink,
  ...theme.navigation.level3,

  "& + a:not([href*='#'])": {
    mt: 3,
  },
});
