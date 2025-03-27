import { buildThemedStyles } from "../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    icon: {
      marginVertical: tokens["space-small"],
      alignItems: "center",
    },
  };
});
