import * as styles from "gatsby-theme-docz/src/components/Sidebar/styles";

export const global = styles.global;

export const overlay = props => ({
  ...styles.overlay(props),
});

export const wrapper = props => ({
  ...styles.wrapper(props),
  p: 0,
});
