import { Dimensions, StyleSheet } from "react-native";
import { tokens } from "../utils/design";

const { height } = Dimensions.get("window");
const modalBorderRadius = tokens["radius-larger"];

export const styles = StyleSheet.create({
  overlayModalize: {
    backgroundColor: "transparent",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: tokens["color-overlay"],
    height,
  },
  modal: {
    borderTopLeftRadius: modalBorderRadius,
    borderTopRightRadius: modalBorderRadius,
    paddingTop: tokens["space-small"],
  },
  children: {
    paddingBottom: tokens["space-small"],
  },
  header: {
    paddingHorizontal: tokens["space-base"],
    paddingTop: tokens["space-small"],
    paddingBottom: tokens["space-base"],
  },
  footerDivider: {
    marginHorizontal: tokens["space-base"],
    marginTop: tokens["space-small"],
    marginBottom: tokens["space-smaller"],
  },
});
