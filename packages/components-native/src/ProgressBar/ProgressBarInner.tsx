import React from "react";
import { View } from "react-native";
// import Reanimated from "react-native-reanimated";
// import { useTiming } from "utils/reanimated";
import { styles } from "./ProgressBar.style";

interface ProgressBarInnerProps {
  readonly width: number;
  readonly animationDuration?: number;
  readonly color?: string;
}

export function ProgressBarInner({
  width,
  // animationDuration = 0,
  color,
}: ProgressBarInnerProps): JSX.Element {
  // Animation breaking on Android
  // const [animatedOpacity] = useTiming({
  //   duration: animationDuration,
  //   fromValue: 0,
  //   toValue: 1,
  // });

  return (
    <View
      style={[
        styles.progressBarInner,
        {
          width: `${width}%`,
          // opacity: animatedOpacity,
          ...(color && { backgroundColor: color }),
        },
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
