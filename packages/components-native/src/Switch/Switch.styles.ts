import { buildThemedStyles } from "../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    container: {
      marginTop: tokens["space-base"],
      marginBottom: tokens["space-base"],
    },
    row: {
      flexDirection: "row",
      width: "100%",
    },
    label: {
      flex: 1,
      justifyContent: "center",
      marginRight: tokens["space-small"],
    },
    description: {
      marginTop: tokens["space-smaller"],
    },
  };
});
