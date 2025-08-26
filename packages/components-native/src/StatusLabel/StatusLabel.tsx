import React from "react";
import { View } from "react-native";
import { useStyles } from "./StatusLabel.style";
import { Typography } from "../Typography";
import { StatusIndicator } from "../StatusIndicator";
import { tokens } from "../utils/design";

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
  readonly text: string;

  /**
   * Alignment of text and StatusIndicator
   */
  readonly alignment?: "start" | "end";

  /**
   * Status color of label container, label, and StatusIndicator
   */
  readonly status?: StatusType;
}

export function StatusLabel({
  text,
  alignment = "end",
  status = "success",
}: StatusLabelProps): JSX.Element {
  const styles = useStyles();

  return (
    <View
      style={[
        styles.statusLabelRow,
        { backgroundColor: tokens[`color-${status}--surface`] },
        alignment === "start" && styles.labelTextStartAligned,
      ]}
    >
      <View style={styles.statusLabelText}>
        <Typography
          align={alignment}
          size="smaller"
          fontWeight="medium"
          color={`${status}OnSurface`}
        >
          {text}
        </Typography>
      </View>
      <StatusIndicator status={status} />
    </View>
  );
}
