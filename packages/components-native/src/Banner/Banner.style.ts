import { buildThemedStyles } from "../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    container: {
      width: "100%",
      borderColor: tokens["color-border"],
      borderStyle: "solid",
      borderBottomWidth: tokens["border-base"],
      backgroundColor: tokens["color-surface"],
    },
    bannerContent: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: tokens["space-small"] + tokens["space-smaller"],
    },
    contentContainer: {
      flex: 1,
    },
    childrenContainer: {
      marginTop: tokens["space-smallest"],
    },
    textContainer: {
      marginTop: tokens["space-minuscule"],
    },
    fullWidth: {
      width: "100%",
    },
    bannerChildrenContent: {
      marginBottom: tokens["space-small"],
    },
    contentSpacing: {
      gap: tokens["space-small"],
    },
  };
});
