import React from "react";
import { View } from "react-native";
import { styles } from "./Divider.style";

interface DividerProps {
  /**
   * The weight of the divider.
   *
   * @default "base"
   */
  readonly size?: keyof typeof styles;
  /**
   * The direction of the divider
   *
   * @default "horizontal"
   */
  readonly direction?: "horizontal" | "vertical";
  /**
   * Used to locate this view in end-to-end tests.
   */
  readonly testID?: string;
}

export function Divider({
  size = "base",
  direction = "horizontal",
  testID = "Divider",
}: DividerProps): JSX.Element {
  const style = [
    styles.base,
    size === "large" && styles.large,
    size === "larger" && styles.larger,
    size === "largest" && styles.largest,
    direction === "horizontal" ? styles.horizontal : styles.vertical,
  ];

  return <View testID={testID} style={style} />;
}
