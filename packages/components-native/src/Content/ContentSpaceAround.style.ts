import { buildThemedStyles } from "../AtlantisThemeContext";

export const useSpaceAroundStyles = buildThemedStyles(tokens => {
  return {
    noneSpace: {
      padding: 0,
    },

    smallestSpace: {
      padding: tokens["space-smallest"],
    },

    smallerSpace: {
      padding: tokens["space-smaller"],
    },

    smallSpace: {
      padding: tokens["space-small"],
    },

    baseSpace: {
      padding: tokens["space-base"],
    },

    largeSpace: {
      padding: tokens["space-large"],
    },
  };
});
