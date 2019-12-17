import React from "react";
import classnames from "classnames";
import styles from "./Spinner.css";

export interface SpinnerProps {
  readonly size?: "small" | "base";
  readonly inline?: boolean;
}

export function Spinner({ size = "base", inline }: SpinnerProps) {
  const spinnerStyles = classnames(styles.spinner, {
    [styles.small]: size === "small",
    [styles.inline]: inline,
  });

  return <div className={spinnerStyles}></div>;
}
