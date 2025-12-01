import { buildThemedStyles } from "../AtlantisThemeContext";

export const useHorizontalStyles = buildThemedStyles(tokens => {
  return {
    wrapper: {
      flexDirection: "row",
    },

    childWrapper: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    },

    noneChildSpace: {
      padding: 0,
    },

    smallestChildSpace: {
      paddingLeft: tokens["space-smallest"],
    },

    smallerChildSpace: {
      paddingLeft: tokens["space-smaller"],
    },

    smallChildSpace: {
      paddingLeft: tokens["space-small"],
    },

    slimChildSpace: {
      paddingLeft: tokens["space-slim"],
    },

    baseChildSpace: {
      paddingLeft: tokens["space-base"],
    },

    largeChildSpace: {
      paddingLeft: tokens["space-large"],
    },

    largerChildSpace: {
      paddingLeft: tokens["space-larger"],
    },

    largestChildSpace: {
      paddingLeft: tokens["space-largest"],
    },

    extravagantChildSpace: {
      paddingLeft: tokens["space-extravagant"],
    },
  };
});
