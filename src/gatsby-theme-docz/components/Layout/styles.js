/* eslint-disable import/export */

// Re-export base theme styles.
export * from "gatsby-theme-docz/src/components/Layout/styles";

// Override what we need to.
import * as styles from "gatsby-theme-docz/src/components/Layout/styles";

export const wrapper = {
  ...styles.wrapper,
  gridTemplateColumns: "undefined",
  gridAutoFlow: "column",
};
