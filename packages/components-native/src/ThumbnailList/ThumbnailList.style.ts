import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const styles = StyleSheet.create({
  list: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxHeight: (tokens["space-extravagant"] + tokens["space-smaller"]) * 2,
    overflow: "hidden",
    marginTop: tokens["space-smaller"],
  },
  maxDimensionsForThreeRows: {
    maxHeight: (tokens["space-extravagant"] + tokens["space-smaller"]) * 3,
  },
  thumbnail: {
    width: tokens["space-extravagant"],
    height: tokens["space-extravagant"],
    marginRight: tokens["space-smaller"],
    marginBottom: tokens["space-smaller"],
    borderRadius: tokens["radius-base"],
    borderColor: tokens["color-border"],
    borderWidth: tokens["border-base"],
  },
  centerThumbnailImage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dimensionsThumbnailImage: {
    width: tokens["space-extravagant"],
    height: tokens["space-extravagant"],
  },
  thumbnailName: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    paddingHorizontal: tokens["space-smaller"],
    paddingVertical: tokens["space-smallest"],
    borderTopColor: tokens["color-border"],
    borderTopWidth: tokens["space-minuscule"],
  },
  thumbnailIcon: {
    top: tokens["space-smaller"],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
