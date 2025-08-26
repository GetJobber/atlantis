import React from "react";
import { View } from "react-native";
import { useStyles } from "./StatusIndicator.style";
import { tokens } from "../utils/design";

export type StatusType =
  | "success"
  | "warning"
  | "critical"
  | "inactive"
  | "informative";
interface StatusIndicatorProps {
  readonly status: StatusType;
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
  const styles = useStyles();

  return (
    <View
      testID={`${status}Indicator`}
      style={[
        styles.statusIndicator,
        { backgroundColor: tokens[`color-${status}`] },
      ]}
    />
  );
}
