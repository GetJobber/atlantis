import React from "react";
import classnames from "classnames";
import styles from "./{{name}}.css";

interface {{name}}Props {
  /**
   * Message is important.
   * @default false
   */
  readonly important?: boolean;
  /**
   * Text to display.
   */
  readonly text: string;
}

export function {{name}}({ important = false, text }: {{name}}Props) {
  const className = classnames(styles.{{lowerCase name}}, { [styles.important]: important });

  return <div className={className}>{text}</div>;
}
