import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

const menuWidth = 208;

export const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    backgroundColor: tokens["color-surface"],
    paddingHorizontal: tokens["space-small"],
    paddingVertical: tokens["space-small"] + tokens["space-smallest"],
    borderRadius: tokens["radius-larger"],
    width: menuWidth,
    ...tokens["shadow-high"],
  },
});
