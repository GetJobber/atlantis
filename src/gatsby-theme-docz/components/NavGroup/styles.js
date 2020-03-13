/* eslint-disable import/export */

// Re-export base theme styles.
export * from "gatsby-theme-docz/src/components/NavGroup/styles";

// Override what we need to.
import * as styles from "gatsby-theme-docz/src/components/NavGroup/styles";

export const sublinkWrapper = {
  ml: 1,
};

export const title = theme => ({
  ...styles.title,
  ...theme.navigation.level1,
});
