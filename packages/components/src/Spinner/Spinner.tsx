import React from "react";
import classnames from "classnames";
import styles from "./Spinner.css";

export interface SpinnerProps {
  readonly size?: "small" | "base";
  readonly inline?: boolean;
  readonly ariaBusy?: "true" | "false";
  readonly role?: "alert" | "none";
}

export function Spinner({
  size = "base",
  inline,
  ariaBusy = "false",
  role = "none",
}: SpinnerProps) {
  const spinnerStyles = classnames(styles.spinner, {
    [styles.small]: size === "small",
    [styles.inline]: inline,
  });

  return <div className={spinnerStyles} role={role} aria-busy={ariaBusy}></div>;
}
