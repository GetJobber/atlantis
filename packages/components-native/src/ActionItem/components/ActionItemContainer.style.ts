import { buildThemedStyles } from "../../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    container: {
      width: "100%",
      flexDirection: "row",
      paddingVertical: tokens["space-base"],
    },

    pressed: {
      opacity: tokens["opacity-pressed"],
    },
  };
});
