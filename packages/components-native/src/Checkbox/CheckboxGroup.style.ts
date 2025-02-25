import { buildThemedStyles } from "../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    container: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: tokens["space-base"],
      paddingVertical: tokens["space-small"],
    },
    nestedCheckboxes: {
      marginLeft: tokens["space-large"],
    },
  };
});
