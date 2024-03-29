import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: tokens["color-border"],
    borderStyle: "solid",
    borderBottomWidth: tokens["border-base"],
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
  fullWidth: {
    width: "100%",
  },
  bannerChildrenContent: {
    marginBottom: tokens["space-small"],
  },
  contentSpacing: {
    gap: tokens["space-small"],
  },
});
