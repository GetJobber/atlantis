import { buildThemedStyles } from "../../../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    bottomSheetOption: {
      display: "flex",
      flexDirection: "row",
      alignContent: "center",
      alignItems: "center",
      padding: tokens["space-small"],
    },
    icon: {
      paddingHorizontal: tokens["space-small"],
    },
    title: {
      paddingHorizontal: tokens["space-small"],
      flexShrink: 1,
    },
  };
});
