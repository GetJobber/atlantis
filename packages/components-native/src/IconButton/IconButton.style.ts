import { buildThemedStyles } from "../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    container: {
      width: tokens["space-largest"],
      height: tokens["space-largest"],
      justifyContent: "center",
      alignItems: "center",
    },
  };
});
