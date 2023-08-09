import { StyleSheet } from "react-native";
import { tokens } from "../../utils/design";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: tokens["space-base"],
  },

  pressed: {
    opacity: tokens["opacity-pressed"],
  },
});
