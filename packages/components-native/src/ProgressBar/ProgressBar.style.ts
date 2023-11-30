import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

export const styles = StyleSheet.create({
  progressBarContainer: {
    marginTop: tokens["space-small"],
    marginBottom: tokens["space-small"],
    height: 20,
    position: "relative",
    flexDirection: "row",
  },
  progressBarInner: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    borderRadius: 100,
  },
  progressInner: {
    height: "100%",
    borderRadius: 100,
  },
  step: {
    flex: 1,
    marginRight: tokens["space-small"],
    height: "100%",
    borderRadius: 100,
    borderColor: "rgba(255,255,255,0.3)",
  },
  completedStep: {
    backgroundColor: tokens["color-interactive"],
  },
});
