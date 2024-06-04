import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const shineWidth = tokens["space-largest"];

export const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens["color-surface--background"],
    overflow: "hidden",
    position: "relative",
    width: "100%",
    height: tokens["space-base"],
    borderRadius: tokens["radius-base"],
  },

  shine: {
    position: "absolute",
    top: 0,
    left: 0,
    width: shineWidth,
    height: "100%",
  },
});
