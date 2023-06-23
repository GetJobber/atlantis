import { StyleSheet } from "react-native";
import { tokens } from "../../../utils/design";

export const styles = StyleSheet.create({
  menuOption: {
    display: "flex",
    paddingHorizontal: tokens["space-base"],
    paddingVertical: tokens["space-small"],
    borderRadius: tokens["radius-large"],
  },
});
