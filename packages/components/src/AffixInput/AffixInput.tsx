import React from "react";
import classnames from "classnames";
import styles from "./AffixInput.css";

interface AffixInputProps {
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

export function AffixInput({ loud = false, text, onClick }: AffixInputProps) {
  const className = classnames(styles.affixInput, { [styles.bold]: loud });

  return (
    <div className={className} onClick={onClick}>
      {text}
    </div>
  );
}
