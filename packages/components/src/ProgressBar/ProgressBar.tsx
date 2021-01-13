import React from "react";
import classnames from "classnames";
import styles from "./ProgressBar.css";
import sizes from "./Sizes.css";

interface ProgressBarProps {
  /**
   * The current step that the progress bar is on.
   */
  readonly currentStep: number;

  /**
   * The total steps to use. For percentages you can set this to 100.
   */
  readonly totalSteps: number;

  /**
   * Set the size of the progress bar
   * @default base
   */
  readonly size?: keyof typeof sizes;
}

export function ProgressBar({
  currentStep,
  totalSteps,
  size = "base",
}: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;
  const progressBarClassName = classnames(styles.ProgressBar, sizes[size]);

  return (
    <progress
      className={progressBarClassName}
      max={totalSteps}
      value={currentStep}
    >
      {percentage}%
    </progress>
  );
}
