import { StyleSheet } from "react-native";
import { tokens } from "../../../utils/design";

export const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackgroundFlat: {
    aspectRatio: 375 / 150,
  },
  imageBackgroundGrid: {
    height: "100%",
  },
  overlay: {
    height: "100%",
    backgroundColor: tokens["color-overlay--dimmed"],
    paddingHorizontal: tokens["space-small"],
  },
  overlayError: {
    height: "100%",
    backgroundColor: tokens["color-overlay--dimmed"],
    paddingHorizontal: tokens["space-small"],
    borderColor: tokens["color-critical"],
    borderWidth: tokens["border-base"],
  },
});
