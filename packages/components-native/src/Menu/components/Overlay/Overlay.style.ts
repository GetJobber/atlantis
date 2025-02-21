import { Dimensions } from "react-native";
import { buildThemedStyles } from "../../../AtlantisThemeContext";

const { height } = Dimensions.get("window");

export const useStyles = buildThemedStyles(tokens => {
  return {
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: tokens["color-overlay"],
      opacity: 0,
      height,
    },
  };
});
