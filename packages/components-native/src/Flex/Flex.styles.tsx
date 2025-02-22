import { StyleSheet, ViewStyle } from "react-native";
import { ColumnKeys } from "./types";

export const styles = StyleSheet.create({
  row: { flexDirection: "row" },
});

export const columnStyles: Record<ColumnKeys, ViewStyle> = StyleSheet.create({
  shrink: {
    flexGrow: 0,
    flexShrink: 1,
  },
  grow: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
  },
});
