import { ViewStyle } from "react-native";
import { Spacing, spacing } from "./types";
import { buildThemedStyles } from "../AtlantisThemeContext";

export const useGapStyles = buildThemedStyles(tokens =>
  spacing.reduce((gapObj, space) => {
    let paddingLeft = 0;
    if (space !== "none") paddingLeft = tokens[`space-${space}`];

    gapObj[space] = { paddingLeft };

    return gapObj;
  }, {} as Record<Spacing, ViewStyle>),
);
