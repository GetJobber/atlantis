import { StyleSheet } from "react-native";
import { tokens } from "../../../utils/design";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 8,
    borderRadius: tokens["radius-circle"],
    overflow: "hidden",
    backgroundColor: tokens["color-surface--background"],
  },
  progress: {
    height: "100%",
    backgroundColor: tokens["color-green"],
  },
});
