import React from "react";
import { View } from "react-native";
import { useStyles } from "./StatusLabel.style";
import { Text } from "../Text";
import { useAtlantisTheme } from "../AtlantisThemeContext";

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
  const styles = useStyles();

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
      <StatusLabelIcon status={status} styles={styles} />
    </View>
  );
}

interface StatusLabelIconProps {
  readonly status: StatusType;
  readonly styles: ReturnType<typeof useStyles>;
}

function StatusLabelIcon({ status, styles }: StatusLabelIconProps) {
  const { tokens } = useAtlantisTheme();

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
