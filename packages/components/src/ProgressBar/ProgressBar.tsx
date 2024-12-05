import React from "react";
import classnames from "classnames";
import styles from "./ProgressBar.module.css";
import sizes from "./ProgressBarSizes.module.css";
import { ProgressBarStepped } from "./ProgressBarStepped";

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

  /**
   * Set the variation of the progress bar
   * @default progress
   */
  readonly variation?: "progress" | "stepped";
}

export function ProgressBar({
  currentStep,
  totalSteps,
  size = "base",
  variation = "progress",
}: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;
  const progressBarClassName = classnames(styles.ProgressBar, sizes[size]);

  if (variation === "stepped") {
    return (
      <ProgressBarStepped
        currentStep={currentStep}
        totalSteps={totalSteps}
        percentage={percentage}
        size={size}
      />
    );
  }

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
