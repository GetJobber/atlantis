import React from "react";
import { View } from "react-native";
import { styles } from "./ProgressBar.style";

interface ProgressBarSteppedProps {
  readonly total: number;
  readonly current: number;
}

export function ProgressBarStepped({
  total,
  current,
}: ProgressBarSteppedProps) {
  return (
    <View style={styles.steppedProgressBarContainer}>
      {Array.from({ length: total }).map((_, index) => {
        const step = index + 1;
        const isCompleted = step <= current;

        return (
          <View
            key={step}
            style={[styles.step, isCompleted && styles.completedStep]}
          ></View>
        );
      })}
    </View>
  );
}
