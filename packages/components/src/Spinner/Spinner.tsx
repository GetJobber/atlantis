import React from "react";
import classnames from "classnames";
import styles from "./Spinner.css";

export interface SpinnerProps {
  readonly small?: boolean;
  readonly inline?: boolean;
}

export function Spinner({ small, inline }: SpinnerProps) {
  const className = classnames(styles.spinner, {
    [styles.small]: small,
    [styles.inline]: inline,
  });

  return <div className={className}></div>;
}
