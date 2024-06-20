import React from "react";
import styles from "./StatusIndicator.css";
import { StatusIndicatorType } from "./StatusIndicator.type";

interface StatusIndicatorProps {
  readonly status: StatusIndicatorType;
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
  return (
    <span
      style={{ backgroundColor: `var(--color-${status})` }}
      className={styles.statusIndicator}
      data-testid={`ATL-Status-Indicator-${status}`}
    />
  );
}
