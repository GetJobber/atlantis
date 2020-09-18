import * as styles from "gatsby-theme-docz/src/components/Sidebar/styles";
import * as navigation from "@jobber/docz-theme/gatsby-theme-docz/theme/navigation";

export const global = styles.global;

export const overlay = props => ({
  ...styles.overlay(props),
});

export const wrapper = props => ({
  ...styles.wrapper(props),
  p: 0,
});

export const linkWrapper = { px: 6 };

export const sidebarLink = {
  ...navigation.levelOne,

  "&.active": {
    mb: 2,
  },
};
