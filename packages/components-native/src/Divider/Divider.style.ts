import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const styles = StyleSheet.create({
  base: {
    height: tokens["space-minuscule"],
    margin: 0,
    borderBottomWidth: tokens["border-base"],
    borderBottomColor: tokens["color-border"],
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
  horizontal: {
    height: tokens["space-minuscule"],
    borderBottomWidth: tokens["divider-width"],
    borderBottom: "solid",
    borderBottomColor: tokens["divider-color"],
  },
  vertical: {
    width: tokens["space-minuscule"],
    height: "auto",
    borderRightWidth: tokens["divider-width"],
    borderRight: "solid",
    borderRightColor: tokens["divider-color"],
  },
});
