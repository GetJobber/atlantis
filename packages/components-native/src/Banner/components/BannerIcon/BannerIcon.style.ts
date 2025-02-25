import { buildThemedStyles } from "../../../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    bannerIcon: {
      borderRadius: tokens["radius-circle"],
      padding: tokens["space-smaller"],
    },
    error: {
      backgroundColor: tokens["color-destructive"],
    },
    warning: {
      backgroundColor: tokens["color-warning"],
    },
    notice: {
      backgroundColor: tokens["color-informative"],
    },
  };
});
