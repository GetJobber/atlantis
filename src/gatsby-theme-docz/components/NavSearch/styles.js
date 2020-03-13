/* eslint-disable import/export */

// Re-export base theme styles.
export * from "gatsby-theme-docz/src/components/NavSearch/styles";

// Override what we need to.
import * as styles from "gatsby-theme-docz/src/components/NavSearch/styles";

export const wrapper = {
  ...styles.wrapper,
  display: "flex",
  bg: "var(--color-blue)",
  borderRadius: 3,
  m: 0,
};

export const input = {
  ...styles.input,
  p: 2,
  color: "var(--color-white)",
};

export const icon = {
  ...styles.icon,
  mx: 2,
};
