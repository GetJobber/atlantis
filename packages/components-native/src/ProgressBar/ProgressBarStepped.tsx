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
    <View style={[styles.progressBarContainer, { height: 10 }]}>
      {Array.from({ length: total }).map((_, index) => {
        const step = index + 1;
        const isCompleted = step <= current;
        const lastStep = step === total;

        return (
          <View
            key={step}
            style={[
              styles.step,
              isCompleted && styles.completedStep,
              lastStep && { marginRight: 0 },
            ]}
            testID={"progress-step"}
          ></View>
        );
      })}
    </View>
  );
}
