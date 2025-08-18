import React from "react";
import type { ActivityIndicatorProps } from "react-native";
import { ActivityIndicator } from "react-native";
import { useAtlantisTheme } from "../AtlantisThemeContext";

export function JobberActivityIndicator(
  props: ActivityIndicatorProps,
): JSX.Element {
  const { tokens } = useAtlantisTheme();

  return (
    <ActivityIndicator
      {...props}
      color={props.color || tokens["color-greyBlue"]}
      testID={props.testID || "ActivityIndicator"}
    />
  );
}
