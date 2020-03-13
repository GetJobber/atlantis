/* eslint-disable import/no-internal-modules */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/export */

// Re-export base theme styles.
export * from "gatsby-theme-docz/src/components/Sidebar/styles";

// Override what we need to.
import * as styles from "gatsby-theme-docz/src/components/Sidebar/styles";

const MENU_PADDING = "32px";

export const overlay = ({ open }) => ({
  ...styles.overlay({ open: open }),
  top: 0,
});

export const wrapper = ({ open }) => ({
  ...styles.wrapper({ open: open }),
  p: MENU_PADDING,
});

export const logo = {
  mt: `-${MENU_PADDING}`,
  mx: `-${MENU_PADDING}`,
  px: MENU_PADDING,
  py: `calc(${MENU_PADDING} / 1.5)`,
  bg: "var(--color-blue--dark)",
  height: t => console.log(t),

  "& a": {
    textTransform: "uppercase",
    color: "var(--color-grey--lightest)",
    fontSize: 4,
    letterSpacing: 0,
    background:
      "-webkit-linear-gradient(var(--color-yellow--lightest), var(--color-yellow))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
};

export const search = {
  position: "sticky",
  top: `-${MENU_PADDING}`,
  zIndex: 999,
  mx: `-${MENU_PADDING}`,
  p: 3,
  bg: "sidebar.bg",
};

export const topLevelMenuWrapper = theme => ({
  "& a:not(:first-child)": {
    ...theme.navigation.level3,
    ml: 0,
  },
});

export const topLevelMenuItem = theme => ({
  ...theme.navigation.level1,
});

export const buttons = {
  position: "fixed",
  top: 0,
  right: 0,
  display: "flex",
  p: 3,
};

export const button = ({ color }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  mx: 1,
  width: 42,
  height: 42,
  borderRadius: 100,
  bg: color || "var(--color-green)",
  color: "var(--color-white)",
});
