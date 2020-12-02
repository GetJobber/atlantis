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
  const progressBarContentClassName = classnames(styles.content);

  return (
    <progress max={totalSteps} value={currentStep}>
      Step {currentStep} of {totalSteps}
    </progress>
  );
}
