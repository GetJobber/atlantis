import { buildThemedStyles } from "../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    statusLabelRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      alignSelf: "flex-start",
      flexWrap: "nowrap",
      flexGrow: 0,
      flexShrink: 1,
      gap: tokens["space-smaller"],
      backgroundColor: tokens["color-success--surface"],
      borderRadius: tokens["radius-large"],
      paddingVertical: tokens["space-smaller"],
      paddingHorizontal: tokens["space-small"],
    },
    statusLabelText: {
      flexShrink: 1,
      marginBottom: -1,
    },
    labelTextStartAligned: {
      flexDirection: "row-reverse",
    },
  };
});
