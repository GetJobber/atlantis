import React, { ReactElement } from "react";
import { Text } from "../Text";
import styles from "./Tooltip.css";

interface TooltipProps {
  /**
   * Tooltip text
   */
  readonly message: string;
  /**
   * Content to show tooltip on.
   */
  readonly children: ReactElement;
}

export function Tooltip({ message, children }: TooltipProps) {
  return (
    <div className={styles.wrapper}>
      {children}
      <div className={[styles.tooltip, styles.above].join(" ")}>
        <Text>{message}</Text>
      </div>
    </div>
  );
}
