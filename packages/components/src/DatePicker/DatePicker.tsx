import React from "react";
import classnames from "classnames";
import styles from "./DatePicker.css";

interface DatePickerProps {
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
  onClick?(event: React.MouseEvent<HTMLDivElement>): void;
}

export function DatePicker({ loud = false, text, onClick }: DatePickerProps) {
  const className = classnames(styles.datePicker, { [styles.bold]: loud });

  return (
    <div className={className} onClick={onClick}>
      {text}
    </div>
  );
}
