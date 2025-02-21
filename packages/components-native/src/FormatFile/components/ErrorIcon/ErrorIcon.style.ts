import { buildThemedStyles } from "../../../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    circle: {
      width: tokens["space-large"],
      height: tokens["space-large"],
      borderRadius: tokens["radius-circle"],
      backgroundColor: tokens["color-surface"],
    },
  };
});
