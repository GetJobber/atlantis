import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: tokens["color-border"],
    borderStyle: "solid",
    borderWidth: tokens["border-base"],
    borderRadius: tokens["radius-base"],
  },
  error: {
    backgroundColor: tokens["color-surface"],
  },
  warning: {
    backgroundColor: tokens["color-surface"],
  },
  notice: {
    backgroundColor: tokens["color-surface"],
  },
  bannerContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: tokens["space-small"] + tokens["space-smaller"],
  },
  contentContainer: {
    flex: 1,
  },
  childrenContainer: {
    marginTop: tokens["space-smallest"],
  },
  textContainer: {
    marginTop: tokens["space-minuscule"],
  },
  // bannerIcon: {
  //   paddingRight: tokens["space-small"],
  // },
});
