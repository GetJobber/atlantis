import { StyleSheet } from "react-native";
import { buildThemedStyles } from "../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  const modalBorderRadius = tokens["radius-larger"];

  return {
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: tokens["color-overlay"],
    },
    modal: {
      borderTopLeftRadius: modalBorderRadius,
      borderTopRightRadius: modalBorderRadius,
      paddingTop: tokens["space-small"],
    },
    children: {
      paddingBottom: tokens["space-small"],
    },
    footer: {
      paddingBottom: tokens["space-small"],
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
