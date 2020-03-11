/* eslint-disable import/export */
/* eslint-disable import/namespace */

// Re-export base theme styles.
export * from "gatsby-theme-docz/src/components/Props/styles";

// Override what we need to.
import * as styles from "gatsby-theme-docz/src/components/Props/styles";

export const container = {
  ...styles.container,
  fontFamily: "monospace",
  fontSize: 2,
};

export const line = {
  ...styles.line,
  px: 2,
};

const column = {
  px: 0,
  mx: 2,
};

export const propName = {
  ...styles.propName,
  ...column,
  fontWeight: "bold",
  color: "var(--color-blue)",
  minWidth: "128px",
  fontFamily: "monospace",
};

export const propType = {
  ...styles.propType,
  ...column,
  flexGrow: "1",
};

export const defaultValue = {
  ...styles.defaultValue,
  ...column,
  flex: "0 0 auto",
};

export const right = {
  ...styles.right,
  px: 0,
  mx: 2,
  flex: "0 0 auto",

  ":empty": {
    display: "none",
  },
};

export const propRequired = {
  ...styles.propRequired,

  ":not(:last-child)": {
    mr: 3,
  },
};

export const openDescBtn = {
  ...styles.openDescBtn,
  mt: 0,
  ml: 0,
};
