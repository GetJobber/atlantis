import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: tokens["space-base"],
    paddingVertical: tokens["space-small"],
  },
  nestedCheckboxes: {
    marginLeft: tokens["space-large"],
  },
});
