import React from "react";
import classnames from "classnames";
import styles from "./RadioGroup.css";

interface RadioGroupProps {
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

export function RadioGroup({ loud = false, text, onClick }: RadioGroupProps) {
  const className = classnames(styles.radioGroup, { [styles.bold]: loud });

  return (
    <div className={className} onClick={onClick}>
      {text}
    </div>
  );
}
