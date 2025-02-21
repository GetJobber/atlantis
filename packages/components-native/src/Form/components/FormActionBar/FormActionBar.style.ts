import { buildThemedStyles } from "../../../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    saveButton: {
      padding: tokens["space-base"],
      backgroundColor: tokens["color-surface"],
      width: "100%",
      ...tokens["shadow-high"],
    },
  };
});
