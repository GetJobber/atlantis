import { buildThemedStyles } from "../../../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  const width = tokens["space-smaller"] + tokens["space-larger"];

  return {
    container: {
      width,
      height: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
    circle: {
      backgroundColor: tokens["color-surface--background"],
      borderRadius: tokens["radius-circle"],
      width: tokens["space-large"],
      height: tokens["space-large"],
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    addedMargin: {
      marginRight: tokens["space-small"],
    },
  };
});
