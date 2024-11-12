import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const verticalStyles = StyleSheet.create({
  base: {
    margin: 0,
    height: "100%",
    width: "1px",
    borderRightWidth: tokens["border-base"],
    borderRightColor: tokens["color-border"],
  },
  large: {
    borderRightWidth: tokens["border-thick"],
    opacity: 0.875,
  },
  larger: {
    borderRightWidth: tokens["border-thicker"],
    opacity: 0.625,
  },
  largest: {
    borderRightWidth: tokens["space-small"],
    opacity: 0.375,
  },
  vertical: {
    borderRightColor: tokens["color-border"],
  },
});
