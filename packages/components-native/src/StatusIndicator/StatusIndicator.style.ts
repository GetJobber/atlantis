import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

const statusIndicatorDiameter = tokens["space-small"];

export const styles = StyleSheet.create({
  statusIndicator: {
    borderRadius: tokens["radius-circle"],
    backgroundColor: tokens["color-success"],
    width: statusIndicatorDiameter,
    height: statusIndicatorDiameter,
  },
});
