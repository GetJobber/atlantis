import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const styles = StyleSheet.create({
  inlineLabel: {
    borderRadius: tokens["radius-large"],
  },
  smaller: {
    paddingVertical: tokens["space-smallest"],
    paddingHorizontal: tokens["space-smaller"],
  },
  small: {
    paddingVertical: tokens["space-smaller"],
    paddingHorizontal: tokens["space-small"],
  },

  default: {
    paddingVertical: tokens["space-smaller"],
    paddingHorizontal: tokens["space-small"],
  },

  large: {
    paddingVertical: tokens["space-smaller"],
    paddingHorizontal: tokens["space-base"] - tokens["space-smallest"],
  },

  larger: {
    paddingVertical: tokens["space-small"],
    paddingHorizontal: tokens["space-base"],
  },

  greyBlue: {
    backgroundColor: tokens["color-inactive--surface"],
  },

  red: {
    backgroundColor: tokens["color-critical--surface"],
  },

  orange: {
    backgroundColor: tokens["color-request--surface"],
  },

  green: {
    backgroundColor: tokens["color-success--surface"],
  },

  blue: {
    backgroundColor: tokens["color-blue--lightest"],
  },

  navy: {
    backgroundColor: tokens["color-task--surface"],
  },

  yellow: {
    backgroundColor: tokens["color-warning--surface"],
  },

  lime: {
    backgroundColor: tokens["color-base-lime--200"],
  },

  purple: {
    backgroundColor: tokens["color-base-purple--200"],
  },

  pink: {
    backgroundColor: tokens["color-quote--surface"],
  },

  teal: {
    backgroundColor: tokens["color-base-teal--200"],
  },

  lightBlue: {
    backgroundColor: tokens["color-informative--surface"],
  },
});
