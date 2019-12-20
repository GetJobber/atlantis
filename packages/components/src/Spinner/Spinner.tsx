import React from "react";
import classnames from "classnames";
import styles from "./Spinner.css";

export interface SpinnerProps {
  readonly size?: "small" | "base";
  /**
   * Specifies the size of the spinner
   *
   * @default "base"
   */
  readonly inline?: boolean;
  /**
   * Controls whether the spinner is rendered in its own space
   * or in line
   */
  readonly ariaBusy?: "true" | "false";
  /**
   * Prop to be set when a relevant portion of the page is
   * currently getting updated
   *
   * @default "false"
   */
  readonly role?: "alert" | "none";
  /**
   * When set, sends out accessible alert event to assistive
   * technology products
   *
   * @default "none"
   */
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
