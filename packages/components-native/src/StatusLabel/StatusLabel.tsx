import React from "react";
import { View } from "react-native";
import { styles } from "./StatusLabel.style";
import { StatusIndicator } from "../StatusIndicator";
import { tokens } from "../utils/design";
import { Typography } from "../Typography";

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
   * Text to display.
   */
  readonly text: string;

  /**
   * Alignment of text
   */
  readonly alignment?: "start" | "end";

  /**
   * Status color of the indicator beside text
   */
  readonly status?: StatusType;
}

export function StatusLabel({
  text,
  alignment = "end",
  status = "success",
}: StatusLabelProps): JSX.Element {
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
          color={`${status}OnSurface`}
        >
          {text}
        </Typography>
      </View>
      <StatusIndicator status={status} />
    </View>
  );
}
