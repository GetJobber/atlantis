import { StyleSheet } from "react-native";
import { tokens } from "../../../utils/design";

const width = tokens["space-smaller"] + tokens["space-larger"];

export const styles = StyleSheet.create({
  container: {
    width,
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  circle: {
    backgroundColor: tokens["color-surface--background"],
    borderRadius: tokens["radius-circle"],
    width: tokens["space-large"],
    height: tokens["space-large"],
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addedMargin: {
    marginRight: tokens["space-small"],
  },
});
