import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

const chipHeight = tokens["space-larger"] + tokens["space-small"];

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: tokens["radius-circle"],
    flexDirection: "row",
    height: chipHeight,
    justifyContent: "center",
    marginHorizontal: tokens["space-smaller"],
    marginTop: tokens["space-small"],
    paddingHorizontal: tokens["space-small"],
  },
  iconLeft: {
    marginHorizontal: tokens["space-smallest"],
  },
  chipText: {
    flexGrow: 1,
    flexShrink: 1,
    marginHorizontal: tokens["space-smallest"],
  },
  dismissIcon: {
    backgroundColor: tokens["color-surface"],
    borderRadius: tokens["radius-circle"],
    marginLeft: tokens["space-smaller"],
    padding: tokens["space-smaller"],
  },
  activeDismissIcon: {
    backgroundColor: tokens["color-surface--background"],
  },
});
