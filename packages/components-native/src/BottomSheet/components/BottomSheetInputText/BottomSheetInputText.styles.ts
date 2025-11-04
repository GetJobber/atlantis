import { buildThemedStyles } from "../../../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    inputText: {
      padding: tokens["space-small"],
    },
  };
});
