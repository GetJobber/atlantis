import React from "react";
import classnames from "classnames";
import styles from "./Example.css";

interface ExampleProps {
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

export function Example({ loud = false, text, onClick }: ExampleProps) {
  const className = classnames(styles.example, { [styles.bold]: loud });

  return (
    <div className={className} onClick={onClick}>
      {text}
    </div>
  );
}
