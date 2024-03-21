import React from "react";
import { View } from "react-native";
import { styles } from "./ProgressBar.style";

interface ProgressBarSteppedProps {
  readonly total: number;
  readonly current: number;
  readonly color?: string;
  readonly loading?: boolean;
  readonly inProgress?: number;
}

export function ProgressBarStepped({
  total,
  current,
  color,
  loading,
  inProgress,
}: ProgressBarSteppedProps) {
  return (
    <View style={[styles.progressBarContainer, { height: 10 }]}>
      {Array.from({ length: total }).map((_, index) => {
        const step = index + 1;
        const isCompleted = step <= current;
        const lastStep = step === total;
        const inProgressSteps = current + (inProgress || 0);

        return (
          <View
            key={step}
            style={[
              styles.step,
              { ...(color && { backgroundColor: color }) },
              !loading && isCompleted && styles.completedStep,
              !loading &&
                !isCompleted &&
                step <= inProgressSteps &&
                styles.inProgressStep,
              lastStep && { marginRight: 0 },
            ]}
            testID={"progress-step"}
          ></View>
        );
      })}
    </View>
  );
}
