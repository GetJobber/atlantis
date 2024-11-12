import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const horizontalStyles = StyleSheet.create({
  base: {
    height: "1px",
    margin: 0,
    width: "auto",
    borderBottomColor: tokens["color-border"],
    borderBottomWidth: tokens["border-base"],
  },
  large: {
    borderBottomWidth: tokens["border-thick"],
    opacity: 0.875,
  },
  larger: {
    borderBottomWidth: tokens["border-thicker"],
    opacity: 0.625,
  },
  largest: {
    borderBottomWidth: tokens["space-small"],
    opacity: 0.375,
  },
});
