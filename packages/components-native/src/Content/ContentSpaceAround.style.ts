import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const spaceStyles = StyleSheet.create({
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
});
