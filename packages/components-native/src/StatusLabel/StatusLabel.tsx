import React from "react";
import { View } from "react-native";
import { styles } from "./StatusLabel.style";
import { tokens } from "../utils/design";
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
   * Text to display.
   */
  readonly text: string;

  /**
   * Alignment of text
   */
  readonly alignment?: "start" | "end";

  /**
   * Status color of the square beside text
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
        alignment === "start" && styles.labelTextStartAligned,
      ]}
    >
      <View style={styles.statusLabelText}>
        <Text align={alignment} level="textSupporting" variation="subdued">
          {text}
        </Text>
      </View>
      <View style={styles.innerPad} />
      <StatusLabelIcon status={status} />
    </View>
  );
}

interface StatusLabelIconProps {
  readonly status: StatusType;
}

function StatusLabelIcon({ status }: StatusLabelIconProps) {
  return (
    <View
      testID={`${status}LabelIcon`}
      style={[
        styles.statusLabelIcon,
        { backgroundColor: tokens[`color-${status}`] },
      ]}
    />
  );
}
