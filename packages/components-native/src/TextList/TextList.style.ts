import { buildThemedStyles } from "../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    details: {
      width: "100%",
      flexDirection: "column",
    },
    detail: {
      flexDirection: "row",
      paddingLeft: tokens["space-small"],
    },
    detailText: {
      paddingLeft: tokens["space-small"],
      flex: 1,
    },
  };
});
