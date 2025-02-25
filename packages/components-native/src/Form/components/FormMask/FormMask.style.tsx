import { buildThemedStyles } from "../../../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    mask: {
      zIndex: tokens["elevation-modal"],
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: tokens["color-overlay--dimmed"],
      padding: tokens["space-base"],
      justifyContent: "center",
    },
  };
});
