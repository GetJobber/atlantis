import React from "react";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { tokens } from "../utils/design";

export function JobberActivityIndicator(
  props: ActivityIndicatorProps,
): JSX.Element {
  return (
    <ActivityIndicator
      {...props}
      color={props.color || tokens["color-greyBlue"]}
      testID={props.testID || "ActivityIndicator"}
    />
  );
}
