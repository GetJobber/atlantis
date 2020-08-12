import React from "react";
import classnames from "classnames";
import styles from "./FileCard.css";

interface FileCardProps {
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

export function FileCard({ loud = false, text, onClick }: FileCardProps) {
  const className = classnames(styles.fileCard, { [styles.bold]: loud });

  return (
    <div className={className} onClick={onClick}>
      {text}
    </div>
  );
}
