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

    slimSpace: {
      padding: tokens["space-slim"],
    },

    baseSpace: {
      padding: tokens["space-base"],
    },

    largeSpace: {
      padding: tokens["space-large"],
    },

    largerSpace: {
      padding: tokens["space-larger"],
    },

    largestSpace: {
      padding: tokens["space-largest"],
    },

    extravagantSpace: {
      padding: tokens["space-extravagant"],
    },
  };
});
