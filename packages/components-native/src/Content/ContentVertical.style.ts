import { buildThemedStyles } from "../AtlantisThemeContext";

export const useVerticalStyles = buildThemedStyles(tokens => {
  return {
    wrapper: {
      // No style. Default `<View />` styling should suffice.
      // Only need this key to exist.
    },

    childWrapper: {
      // No style. Default `<View />` styling should suffice.
      // Only need this key to exist.
    },

    noneChildSpace: {
      padding: 0,
    },

    minusculeChildSpace: {
      paddingTop: tokens["space-minuscule"],
    },

    smallestChildSpace: {
      paddingTop: tokens["space-smallest"],
    },

    smallerChildSpace: {
      paddingTop: tokens["space-smaller"],
    },

    smallChildSpace: {
      paddingTop: tokens["space-small"],
    },

    slimChildSpace: {
      paddingTop: tokens["space-slim"],
    },

    baseChildSpace: {
      paddingTop: tokens["space-base"],
    },

    largeChildSpace: {
      paddingTop: tokens["space-large"],
    },

    largerChildSpace: {
      paddingTop: tokens["space-larger"],
    },

    largestChildSpace: {
      paddingTop: tokens["space-largest"],
    },

    extravagantChildSpace: {
      paddingTop: tokens["space-extravagant"],
    },
  };
});
