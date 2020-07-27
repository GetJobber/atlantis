import React from "react";
import classnames from "classnames";
import styles from "./Toast.css";

interface ToastProps {
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

export function Toast({ loud = false, text, onClick }: ToastProps) {
  const className = classnames(styles.toast, { [styles.bold]: loud });

  return (
    <div className={className} onClick={onClick}>
      {text}
    </div>
  );
}
