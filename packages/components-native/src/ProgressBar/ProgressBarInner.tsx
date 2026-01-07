import React from "react";
import { View } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import { useStyles } from "./ProgressBar.style";

interface ProgressBarInnerProps {
  readonly width: number;
  readonly animationDuration?: number;
  readonly color?: string;
  readonly style?: StyleProp<ViewStyle>;
  readonly testID?: string;
}

export function ProgressBarInner({
  width,
  color,
  style,
  testID,
}: ProgressBarInnerProps) {
  const styles = useStyles();

  return (
    <View
      testID={testID}
      style={[
        styles.progressBarInner,
        {
          width: `${width}%`,
          ...(color && { backgroundColor: color }),
        },
        style,
      ]}
    />
  );
}

export function calculateWidth(total: number, current: number): number {
  if (total <= 0) return 0;
  if (current >= total) return 100;

  const curr = Math.max(0, current);

  if (curr >= total) return 100;

  return (curr / total) * 100;
}
