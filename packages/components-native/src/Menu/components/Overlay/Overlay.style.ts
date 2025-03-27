import { Dimensions, StyleSheet } from "react-native";
import { buildThemedStyles } from "../../../AtlantisThemeContext";

const { height } = Dimensions.get("window");

export const useStyles = buildThemedStyles(tokens => {
  return {
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: tokens["color-overlay"],
      opacity: 0,
      height,
    },
  };
});
