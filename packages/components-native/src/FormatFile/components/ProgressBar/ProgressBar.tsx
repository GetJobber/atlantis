import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { styles } from "./ProgressBar.style";
import { StatusCode } from "../../types";

interface ProgressBarProps {
  /**
   * Upload progress value from 0 to 1
   */
  progress: number;
  /**
   * Upload status
   */
  status: StatusCode;
  /**
   * Function to be called when the progress is finished
   */
  onComplete?: () => void;
}

export const ProgressBar = ({
  progress,
  status,
  onComplete,
}: ProgressBarProps): JSX.Element => {
  const barWidth = useRef(new Animated.Value(0)).current;
  const progressPercentage = barWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", `100%`],
  });

  useEffect(() => {
    Animated.timing(barWidth, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (status === StatusCode.Completed && finished && onComplete) {
        onComplete();
      }
    });
  }, [progress, barWidth, onComplete, status]);

  return (
    <View testID="format-file-progress-bar" style={styles.container}>
      <Animated.View
        testID={"format-file-inner-progress-bar"}
        style={[
          styles.progress,
          {
            width: progressPercentage,
          },
        ]}
      />
    </View>
  );
};
