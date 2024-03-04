import React from "react";
import styles from "./StatusIndicator.css";

export type StatusType =
  | "success"
  | "warning"
  | "critical"
  | "inactive"
  | "informative";

interface StatusIndicatorProps {
  readonly status: StatusType;
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
  return (
    <div
      style={{ backgroundColor: `var(--color-${status}` }}
      className={styles.statusIndicator}
    />
  );
}
