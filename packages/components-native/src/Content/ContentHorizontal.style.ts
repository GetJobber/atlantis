import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const horizontalStyles = StyleSheet.create({
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

  baseChildSpace: {
    paddingLeft: tokens["space-base"],
  },

  largeChildSpace: {
    paddingLeft: tokens["space-large"],
  },
});
