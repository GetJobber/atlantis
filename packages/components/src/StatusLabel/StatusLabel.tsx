import React from "react";
import classnames from "classnames";
import styles from "./StatusLabel.css";
import { StatusType } from "./StatusType";
import { Text } from "../Text";
import { StatusIndicator } from "../StatusIndicator/StatusIndicator";

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
      <div className={styles.statusIndicator}>
        <StatusIndicator status={status} />
      </div>

      <Text size="small" align={alignment}>
        {label}
      </Text>
    </div>
  );
}
