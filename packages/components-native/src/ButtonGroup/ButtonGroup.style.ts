import { buildThemedStyles } from "../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    buttonGroup: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: tokens["space-small"],
    },
    button: {
      flexBasis: tokens["space-largest"],
      flexGrow: 1,
    },
    moreButton: {
      flexBasis: tokens["space-largest"],
      flexGrow: 0,
    },
  };
});
