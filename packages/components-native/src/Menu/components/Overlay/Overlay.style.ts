import { Dimensions, StyleSheet } from "react-native";
import { tokens } from "../../../utils/design";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: tokens["color-overlay"],
    opacity: 0,
    height,
  },
});
