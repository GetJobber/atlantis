import { StyleSheet } from "react-native";
import { tokens } from "../../../utils/design";

export const styles = StyleSheet.create({
  saveButton: {
    padding: tokens["space-base"],
    backgroundColor: tokens["color-surface"],
    width: "100%",
    ...tokens["shadow-high"],
  },
});
