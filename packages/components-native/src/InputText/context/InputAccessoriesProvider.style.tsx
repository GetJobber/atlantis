import { buildThemedStyles } from "../../AtlantisThemeContext";
import { PlatformColor } from "../../utils/reactNativePolyfill";

const BAR_HEIGHT = 44;

export const useStyles = buildThemedStyles(tokens => {
  return {
    container: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingHorizontal: tokens["space-small"],
      borderTopWidth: tokens["space-minuscule"],
      borderTopColor: tokens["color-border"],
      height: BAR_HEIGHT,
    },
    lightTheme: {
      backgroundColor: tokens["color-surface--background"],
    },
    darkTheme: {
      backgroundColor: PlatformColor("systemGray3"),
    },
  };
});
