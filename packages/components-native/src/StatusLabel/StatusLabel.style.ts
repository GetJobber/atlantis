import { StyleSheet } from "react-native";
import { tokens } from "../utils/design";

const statusLabelIconDiameter = tokens["space-base"] - tokens["space-smaller"]; //12px

const indicatorOffset = tokens["space-smallest"] + tokens["space-minuscule"];

// Needs to be hardcoded to 3 as this shouldn't change with the tokens
const statusLabelRadius = 3;

export const styles = StyleSheet.create({
  statusLabelRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flexWrap: "nowrap",
  },
  statusLabelText: {
    flexShrink: 1,
  },
  statusLabelIcon: {
    borderRadius: statusLabelRadius,
    backgroundColor: tokens["color-success"],
    width: statusLabelIconDiameter,
    height: statusLabelIconDiameter,
    marginTop: indicatorOffset,
  },
  labelTextStartAligned: {
    flexDirection: "row-reverse",
  },
  innerPad: {
    width: tokens["space-small"],
  },
});
