import { StyleSheet, ViewStyle } from "react-native";
import { ColumnKeys, Spacing, spacing } from "./types";
import { tokens as staticTokens } from "../utils/design";

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

export const gapStyles = StyleSheet.create(
  spacing.reduce((gapObj, space) => {
    let paddingLeft = 0;
    if (space !== "none") paddingLeft = staticTokens[`space-${space}`];

    gapObj[space] = { paddingLeft };

    return gapObj;
  }, {} as Record<Spacing, ViewStyle>),
);
