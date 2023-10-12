import React from "react";
import classnames from "classnames";
import styles from "./StatusLabel.css";
import { Text } from "../Text";

export type StatusType =
  | "success"
  | "warning"
  | "critical"
  | "inactive"
  | "informative";

export interface StatusLabelType {
  readonly statusLabel: string;
  readonly statusType?: StatusType;
}

interface StatusLabelProps {
  /**
   * Text to display
   */
  readonly label: string;

  /**
   * Alignment of label
   *
   * @default "start"
   */
  readonly alignment?: "start" | "end";

  /**
   * Status color of the indicator beside text
   *
   * @default "inactive"
   */
  readonly status: StatusType;
}

export function StatusLabel({
  label,
  alignment = "start",
  status = "inactive",
}: StatusLabelProps): JSX.Element {
  const containerClassNames = classnames(
    styles.statusLabelRow,
    alignment === "end" && styles.labelTextEndAligned,
  );

  return (
    <div role="status" className={containerClassNames}>
      <StatusLabelIcon status={status} />
      <Text size="small" align={alignment}>
        {label}
      </Text>
    </div>
  );
}

interface StatusLabelIconProps {
  readonly status: StatusType;
}

function StatusLabelIcon({ status }: StatusLabelIconProps) {
  return (
    <div
      style={{ backgroundColor: `var(--color-${status}` }}
      className={styles.statusIndicator}
    />
  );
}
