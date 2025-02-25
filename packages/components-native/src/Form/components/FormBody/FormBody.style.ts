import { buildThemedStyles } from "../../../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    container: {
      flex: 1,
      flexGrow: 1,
      width: "100%",
    },
    safeArea: {
      backgroundColor: tokens["color-surface"],
    },
    scrollContentContainer: {
      flexGrow: 1,
    },
    scrollView: {
      flexGrow: 1,
    },
    formChildContainer: {
      flexGrow: 1,
      justifyContent: "flex-start",
    },
    activityIndicator: {
      marginVertical: tokens["space-base"],
      flex: 1,
    },
  };
});
