import React from "react";
import { View } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
// import Reanimated from "react-native-reanimated";
// import { useTiming } from "utils/reanimated";
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
  // animationDuration = 0,
  color,
  style,
  testID,
}: ProgressBarInnerProps) {
  // Animation breaking on Android
  // const [animatedOpacity] = useTiming({
  //   duration: animationDuration,
  //   fromValue: 0,
  //   toValue: 1,
  // });
  const styles = useStyles();

  return (
    <View
      testID={testID}
      style={[
        styles.progressBarInner,
        {
          width: `${width}%`,
          // opacity: animatedOpacity,
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
