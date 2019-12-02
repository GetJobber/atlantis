import React from "react";
import classnames from "classnames";
import styles from "./Spinner.css";

interface SpinnerProps {
  /**
   * Styles the text bold and uppercased
   * @default false
   */
  readonly loud?: boolean;

  /**
   * Text to display.
   */
  readonly text: string;

  /**
   * Click handler.
   */
  onClick?(): void;
}

// TODO: area label (accessibility)
export function Spinner({}: SpinnerProps) {
  const className = classnames(styles.spinner);

  return <div className={className}></div>;
}
