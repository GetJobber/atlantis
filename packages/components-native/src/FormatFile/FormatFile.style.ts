import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const styles = StyleSheet.create({
  thumbnailContainer: {
    backgroundColor: tokens["color-surface--background"],
    borderWidth: tokens["border-base"],
    borderColor: tokens["color-border"],
    borderRadius: tokens["radius-base"],
    marginBottom: tokens["space-small"],
  },
  thumbnailContainerGrid: {
    width: tokens["space-extravagant"],
    height: tokens["space-extravagant"],
    marginRight: tokens["space-small"],
  },
});
