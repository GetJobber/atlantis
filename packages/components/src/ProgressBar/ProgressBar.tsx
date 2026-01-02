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

  /** **Use at your own risk:** Custom class names for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_className?: string;

  /** **Use at your own risk:** Custom style for specific elements. This should only be used as a
   * **last resort**. Using this may result in unexpected side effects.
   * More information in the [Customizing components Guide](https://atlantis.getjobber.com/guides/customizing-components).
   */
  readonly UNSAFE_style?: React.CSSProperties;
}

export function ProgressBar({
  currentStep,
  totalSteps,
  size = "base",
  variation = "progress",
  UNSAFE_className,
  UNSAFE_style,
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
        UNSAFE_className={UNSAFE_className}
        UNSAFE_style={UNSAFE_style}
      />
    );
  }

  return (
    <progress
      className={classnames(progressBarClassName, UNSAFE_className)}
      style={UNSAFE_style}
      max={totalSteps}
      value={currentStep}
    >
      {percentage}%
    </progress>
  );
}
