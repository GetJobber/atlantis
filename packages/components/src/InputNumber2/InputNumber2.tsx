import React from "react";
import classnames from "classnames";
import styles from "./InputNumber2.module.css";

export interface InputNumber2Props {
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

export function InputNumber2({
  loud = false,
  text,
  onClick,
}: InputNumber2Props) {
  const className = classnames(styles.inputNumber2, { [styles.bold]: loud });

  return (
    <div className={className} onClick={onClick}>
      {text}
    </div>
  );
}
