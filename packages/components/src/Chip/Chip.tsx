import React from "react";
import classnames from "classnames";
import styles from "./Chip.css";

interface ChipProps {
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

export function Chip({ loud = false, text, onClick }: ChipProps) {
  const className = classnames(styles.chip, { [styles.bold]: loud });

  return (
    <div className={className} onClick={onClick}>
      {text}
    </div>
  );
}
