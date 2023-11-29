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
  largest: {
    borderBottomWidth: tokens["space-small"],
    opacity: 0.375,
  },
});
