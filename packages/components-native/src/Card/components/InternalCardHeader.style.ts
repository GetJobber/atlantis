import { StyleSheet } from "react-native";
import { tokens } from "../../utils/design";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingTop: tokens["space-small"] + tokens["space-smaller"],
    paddingHorizontal: tokens["space-base"],
  },

  pressed: {
    opacity: tokens["opacity-pressed"],
  },

  noChildren: {
    paddingBottom: tokens["space-small"] + tokens["space-smaller"],
  },
});
