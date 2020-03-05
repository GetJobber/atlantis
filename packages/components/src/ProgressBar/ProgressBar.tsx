import React from "react";
import classnames from "classnames";
import styles from "./ProgressBar.css";

interface ProgressBarProps {
  /**
   * The current step that the progress bar is on.
   */
  readonly currentStep: number;

  /**
   * The total steps to use. For percentages you can set this to 100.
   */
  readonly totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
  const widthPercent = Math.min(100, Math.max(0, percentage));
  const className = classnames(styles.container);
  const contentClassName = classnames(styles.content);

  return (
    <div className={className}>
      <div className={contentClassName} style={{ width: `${widthPercent}%` }} />
    </div>
  );
}
