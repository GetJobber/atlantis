import React from "react";
import classnames from "classnames";
import styles from "./StatusLabel.module.css";
import type { StatusIndicatorType } from "../StatusIndicator/StatusIndicator.type";
import { Typography } from "../Typography";
import { StatusIndicator } from "../StatusIndicator/StatusIndicator";

export interface StatusLabelType {
  readonly statusLabel: string;
  readonly statusType?: StatusIndicatorType;
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
  readonly status: StatusIndicatorType;
}

export function StatusLabel({
  label,
  alignment = "start",
  status = "inactive",
}: StatusLabelProps): JSX.Element {
  const containerClassNames = classnames(
    styles.statusLabelRow,
    styles[status],
    alignment === "end" && styles.labelTextEndAligned,
  );

  return (
    <div role="status" className={containerClassNames}>
      <div className={styles.statusIndicatorWrapper}>
        <StatusIndicator status={status} />
      </div>

      <Typography size="small" align={alignment}>
        {label}
      </Typography>
    </div>
  );
}
