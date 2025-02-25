import { buildThemedStyles } from "../../../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    container: {
      width: "100%",
      height: 8,
      borderRadius: tokens["radius-circle"],
      overflow: "hidden",
      backgroundColor: tokens["color-surface--background"],
    },
    progress: {
      height: "100%",
      backgroundColor: tokens["color-green"],
    },
  };
});
