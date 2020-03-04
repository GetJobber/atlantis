import React from "react";
import classnames from "classnames";
import styles from "./Spinner.css";

interface SpinnerProps {
  /**
   * Specifies the size of the spinner
   *
   * @default "base"
   */
  readonly size?: "small" | "base";

  /**
   * Controls whether the spinner is rendered in its own space
   * or in line
   */
  readonly inline?: boolean;
}

export function Spinner({ size = "base", inline }: SpinnerProps) {
  const spinnerStyles = classnames(styles.spinner, {
    [styles.small]: size === "small",
    [styles.inline]: inline,
  });

  return <div className={spinnerStyles} role="alert" aria-busy="true"></div>;
}
