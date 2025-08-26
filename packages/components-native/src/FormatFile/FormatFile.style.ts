import { buildThemedStyles } from "../AtlantisThemeContext";

export const useStyles = buildThemedStyles(tokens => {
  return {
    thumbnailContainer: {
      backgroundColor: tokens["color-surface--background"],
      borderWidth: tokens["border-base"],
      borderColor: tokens["color-border"],
      borderRadius: tokens["radius-base"],
      marginBottom: tokens["space-small"],
      // This is to prevent the image from overflowing the container's border radius, otherwise it can "bleed" out the corners
      overflow: "hidden",
    },
    thumbnailContainerGrid: {
      width: tokens["space-extravagant"],
      height: tokens["space-extravagant"],
      marginRight: tokens["space-small"],
    },
  };
});
