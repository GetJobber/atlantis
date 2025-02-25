import { buildThemedStyles } from "../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    container: {
      width: "100%",
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    countColumn: {
      paddingRight: tokens["space-base"],
    },
    titleContainer: {
      flexDirection: "row",
    },
    contentContainer: {
      paddingTop: tokens["space-small"],
    },
  };
});
