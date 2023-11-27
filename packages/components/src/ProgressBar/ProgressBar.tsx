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
  const steppedProgressBarClassName = classnames(
    styles.SteppedProgressBar,
    sizes[size],
  );

  function steppedVariation() {
    return (
      <div className={steppedProgressBarClassName}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const step = index + 1;
          const value = step <= currentStep ? 100 : 0;
          const ariaValue = currentStep / totalSteps;
          const ariaLabel = `progress, ${step} out of ${totalSteps}`;

          return (
            <progress
              key={step}
              className={steppedProgressBarClassName}
              value={value}
              aria-valuenow={ariaValue}
              aria-valuetext={ariaLabel}
            >
              {value}%
            </progress>
          );
        })}
      </div>
    );
  }

  if (variation === "stepped") return steppedVariation();

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
