import { buildThemedStyles } from "../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  const modalBorderRadius = tokens["radius-larger"];

  return {
    backdrop: {
      backgroundColor: tokens["color-overlay"],
    },
    background: {
      borderTopLeftRadius: modalBorderRadius,
      borderTopRightRadius: modalBorderRadius,
    },
    footerContainer: {
      backgroundColor: tokens["color-surface"],
    },
    header: {
      paddingHorizontal: tokens["space-base"],
      paddingTop: tokens["space-small"],
      paddingBottom: tokens["space-base"],
    },
    footerDivider: {
      marginHorizontal: tokens["space-base"],
      marginTop: tokens["space-small"],
      marginBottom: tokens["space-smaller"],
    },
    handle: {
      display: "none",
    },
  };
});
