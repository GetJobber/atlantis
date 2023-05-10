import { StyleSheet } from "react-native";
// eslint-disable-next-line import/no-internal-modules
import { JobberStyle } from "../utils/design";

export const styles = StyleSheet.create({
  base: {
    height: JobberStyle["space-minuscule"],
    margin: 0,
    borderBottomWidth: JobberStyle["border-base"],
    borderBottomColor: JobberStyle["color-border"],
  },
  large: {
    borderBottomWidth: JobberStyle["border-thick"],
    opacity: 0.875,
  },
  largest: {
    borderBottomWidth: JobberStyle["space-small"],
    opacity: 0.375,
  },
});
