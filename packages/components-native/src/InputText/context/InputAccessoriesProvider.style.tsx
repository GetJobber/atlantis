import { PlatformColor, StyleSheet } from "react-native";
import { tokens } from "../../utils/design";

const BAR_HEIGHT = 44;

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: tokens["space-small"],
    borderTopWidth: tokens["space-minuscule"],
    borderTopColor: tokens["color-border"],
    height: BAR_HEIGHT,
  },
  lightTheme: {
    backgroundColor: tokens["color-surface--background"],
  },
  darkTheme: {
    // PlatformColor has to be conditional for Storybook to run without error
    backgroundColor: PlatformColor?.("systemGray3"),
  },
});
