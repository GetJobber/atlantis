import { Dimensions, StyleSheet } from "react-native";
import { tokens as staticTokens } from "../utils/design";
import { buildThemedStyles } from "../AtlantisThemeContext";

const { height } = Dimensions.get("window");
const modalBorderRadius = staticTokens["radius-larger"];

export const useStyles = buildThemedStyles(tokens => {
  return {
    overlayModalize: {
      backgroundColor: "transparent",
    },

    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: tokens["color-overlay"],
      height,
    },
    modal: {
      borderTopLeftRadius: modalBorderRadius,
      borderTopRightRadius: modalBorderRadius,
      paddingTop: tokens["space-small"],
    },
    children: {
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
