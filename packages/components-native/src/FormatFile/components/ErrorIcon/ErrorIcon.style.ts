import { StyleSheet } from "react-native";
import { tokens } from "../../../utils/design";

export const styles = StyleSheet.create({
  circle: {
    width: tokens["space-large"],
    height: tokens["space-large"],
    borderRadius: tokens["radius-circle"],
    backgroundColor: tokens["color-surface"],
  },
});
