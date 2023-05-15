import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const verticalStyles = StyleSheet.create({
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

  smallestChildSpace: {
    paddingTop: tokens["space-smallest"],
  },

  smallerChildSpace: {
    paddingTop: tokens["space-smaller"],
  },

  smallChildSpace: {
    paddingTop: tokens["space-small"],
  },

  baseChildSpace: {
    paddingTop: tokens["space-base"],
  },

  largeChildSpace: {
    paddingTop: tokens["space-large"],
  },
});
