import { buildThemedStyles } from "../../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    header: {
      flexDirection: "row",
      alignItems: "flex-start",
      paddingTop: tokens["space-small"] + tokens["space-smaller"],
      paddingHorizontal: tokens["space-base"],
    },

    pressed: {
      opacity: tokens["opacity-pressed"],
    },

    noChildren: {
      paddingBottom: tokens["space-small"] + tokens["space-smaller"],
    },
  };
});
