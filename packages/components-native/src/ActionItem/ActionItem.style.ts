import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const styles = StyleSheet.create({
  actionItemHorizontalOffset: {
    paddingHorizontal: tokens["space-base"],
  },

  icon: {
    justifyContent: "flex-start",
    paddingRight: tokens["space-small"],
  },

  titlePadding: {
    paddingBottom: tokens["space-smaller"],
  },

  content: {
    flex: 1,
  },

  offsetForIcons: {
    paddingTop: tokens["space-smallest"],
  },

  actionIcon: {
    paddingLeft: tokens["space-small"],
  },
});
