import React from "react";
import styles from "./StatusIndicator.module.css";
import type { StatusIndicatorType } from "./StatusIndicator.type";

interface StatusIndicatorProps {
  /**
   * Determines the color of the StatusIndicator
   * with colors that map to Atlantis status colors.
   */
  readonly status: StatusIndicatorType;

  /**
   * Used for screen readers in cases where the
   * StatusIndicator is not paired with a label.
   */
  readonly accessibilityLabel?: string;
}

export function StatusIndicator({
  status,
  accessibilityLabel,
}: StatusIndicatorProps) {
  return (
    <span
      style={{ backgroundColor: `var(--color-${status})` }}
      className={styles.statusIndicator}
      data-testid={`ATL-Status-Indicator-${status}`}
      aria-label={
        accessibilityLabel ? `Status: ${accessibilityLabel}` : undefined
      }
    />
  );
}
