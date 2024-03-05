import { StyleSheet } from "react-native";
import { tokens } from "../../../utils/design";

export const styles = StyleSheet.create({
  bannerIcon: {
    borderRadius: tokens["radius-circle"],
    padding: tokens["space-smaller"],
  },
  error: {
    backgroundColor: tokens["color-destructive"],
  },
  warning: {
    backgroundColor: tokens["color-warning"],
  },
  notice: {
    backgroundColor: tokens["color-informative"],
  },
});
