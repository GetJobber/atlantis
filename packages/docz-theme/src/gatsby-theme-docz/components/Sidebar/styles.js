import * as styles from "gatsby-theme-docz/src/components/Sidebar/styles";
import * as navigation from "@jobber/docz-theme/gatsby-theme-docz/theme/navigation";

export const global = styles.global;

export const overlay = props => ({
  ...styles.overlay(props),
});

export const wrapper = props => ({
  ...styles.wrapper(props),
  p: 0,

  "-ms-overflow-style": "none",
  scrollbarWidth: "none",

  "&::-webkit-scrollbar": {
    display: "none",
  },
});

export const linkWrapper = { px: 6 };

export const sidebarLink = {
  ...navigation.levelOne,

  "&.active": {
    mb: 2,
  },
};

export const search = {
  position: "sticky",
  top: 0,
};
