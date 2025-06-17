import { buildThemedStyles } from "../AtlantisThemeContext";

const menuWidth = 208;

export const useStyles = buildThemedStyles(tokens => {
  return {
    menu: {
      position: "absolute",
      backgroundColor: tokens["color-surface"],
      paddingHorizontal: tokens["space-small"],
      paddingVertical: tokens["space-small"] + tokens["space-smallest"],
      borderRadius: tokens["radius-base"],
      width: menuWidth,
      ...tokens["shadow-high"],
    },
  };
});
