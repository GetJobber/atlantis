import { StyleSheet } from "react-native";
import { buildThemedStyles } from "../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  const modalBorderRadius = tokens["radius-larger"];

  return {
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: tokens["color-overlay"],
    },
    background: {
      borderTopLeftRadius: modalBorderRadius,
      borderTopRightRadius: modalBorderRadius,
      paddingTop: tokens["space-small"],
    },
    content: {
      paddingBottom: tokens["space-small"],
    },
    footer: {
      paddingBottom: tokens["space-small"],
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
  };
});
