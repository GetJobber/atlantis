import { tokens as staticTokens } from "@jobber/design";
import { buildThemedStyles } from "../AtlantisThemeContext";

export const shineWidth = staticTokens["space-largest"];

export const useStyles = buildThemedStyles(tokens => {
  return {
    container: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      overflow: "hidden",
      position: "relative",
      width: "100%",
      height: tokens["space-base"],
      borderRadius: tokens["radius-base"],
    },

    shine: {
      position: "absolute",
      top: 0,
      left: 0,
      width: shineWidth,
      height: "100%",
    },
  };
});
