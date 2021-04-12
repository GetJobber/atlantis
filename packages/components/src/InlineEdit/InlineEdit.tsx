import React from "react";
import classnames from "classnames";
import styles from "./InlineEdit.css";

interface InlineEditProps {
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

export function InlineEdit({ loud = false, text, onClick }: InlineEditProps) {
  const className = classnames(styles.inlineEdit, { [styles.bold]: loud });

  return (
    <div className={className} onClick={onClick}>
      {text}
    </div>
  );
}
