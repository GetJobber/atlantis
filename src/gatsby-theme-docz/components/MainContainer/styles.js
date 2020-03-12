/* eslint-disable import/export */
/* eslint-disable import/namespace */

// Re-export base theme styles.
export * from "gatsby-theme-docz/src/components/MainContainer/styles";

// Override what we need to.
import * as styles from "gatsby-theme-docz/src/components/MainContainer/styles";

export const container = {
  ...styles.container,
  maxWidth: "960px",
};
