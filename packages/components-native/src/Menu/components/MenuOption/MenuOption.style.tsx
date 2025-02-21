import { buildThemedStyles } from "../../../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    menuOption: {
      display: "flex",
      paddingHorizontal: tokens["space-base"],
      paddingVertical: tokens["space-small"],
      borderRadius: tokens["radius-large"],
    },
  };
});
