import { StyleSheet } from "react-native";
import { tokens } from "../../utils/design";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: tokens["space-small"],
    backgroundColor: tokens["color-surface--background"],
    borderTopWidth: tokens["space-minuscule"],
    borderTopColor: tokens["color-border"],
  },
  buttonContainer: {
    flexDirection: "row",
  },
});
