import React from "react";
import classnames from "classnames";
import styles from "./{{name}}.css";

interface {{name}}Props {
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

export function {{name}}({ loud = false, text, onClick }: {{name}}Props) {
  const className = classnames(styles.{{camelCase name}}, { [styles.bold]: loud });

  return (
    <div className={className} onClick={onClick}>
      {text}
    </div>
  );
}
