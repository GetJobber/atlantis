import { buildThemedStyles } from "../../../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    pressed: {
      opacity: tokens["opacity-pressed"],
    },
  };
});
