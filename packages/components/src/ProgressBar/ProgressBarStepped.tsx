import React from "react";
import classnames from "classnames";
import styles from "./ProgressBar.css";
import sizes from "./Sizes.css";

interface ProgressBarSteppedProps {
  readonly currentStep: number;
  readonly totalSteps: number;
  readonly percentage: number;
  readonly size?: keyof typeof sizes;
}

export function ProgressBarStepped({
  currentStep,
  totalSteps,
  percentage,
  size = "base",
}: ProgressBarSteppedProps) {
  const steppedProgressBarClassName = classnames(
    styles.ProgressBar,
    styles.SteppedProgressBar,
    sizes[size],
  );
  const ariaLabel = `progress, ${currentStep} out of ${totalSteps}`;

  return (
    <div
      role={"progressbar"}
      className={styles.wrapper}
      aria-valuenow={percentage}
      aria-valuetext={ariaLabel}
    >
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;
        const value = step <= currentStep ? 100 : 0;

        return (
          <progress
            key={step}
            className={steppedProgressBarClassName}
            value={value}
            data-testid={"progress-step"}
          >
            {value}%
          </progress>
        );
      })}
    </div>
  );
}
