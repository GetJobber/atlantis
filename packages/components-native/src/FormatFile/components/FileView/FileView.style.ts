import { StyleSheet } from "react-native";
import { tokens } from "../../../utils/design";

export const styles = StyleSheet.create({
  overlay: {
    backgroundColor: tokens["color-overlay--dimmed"],
  },
  overlayError: {
    backgroundColor: tokens["color-overlay--dimmed"],
    borderColor: tokens["color-critical"],
    borderWidth: tokens["border-base"],
  },
  iconCenter: {
    marginBottom: tokens["space-large"],
  },
  fileBackground: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  fileBackgroundGrid: {
    height: "100%",
  },
  fileBackgroundFlat: {
    justifyContent: "center",
    height: tokens["space-extravagant"],
  },
  fileIconGrid: {
    top: tokens["space-small"],
  },
  fileIconFlat: {
    top: tokens["space-smaller"],
  },
  fileNameError: {
    alignItems: "center",
    borderTopColor: tokens["color-border"],
    borderTopWidth: tokens["space-minuscule"],
    width: "100%",
    marginTop: tokens["space-base"],
  },
  fileName: {
    alignItems: "center",
    borderTopColor: tokens["color-border"],
    borderTopWidth: tokens["space-minuscule"],
    width: "100%",
  },
  fileNameGrid: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
  },
  fileNameFlat: {
    top: tokens["space-small"],
  },
  fileOverlay: {
    position: "absolute",
    justifyContent: "center",
    right: 0,
    bottom: 0,
    left: 0,
    height: "100%",
    paddingHorizontal: tokens["space-small"],
  },
});
