import React from "react";
import { Text } from "react-native";
import { styles } from "./{{name}}.style";

interface {{name}}Props {
  /**
   * Text to display.
   */
  readonly text: string;
}

export function {{name}}({ text }: {{name}}Props) {
  return <Text style={styles.bold}>{text}</Text>
}
