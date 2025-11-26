import React from "react";
import { View } from "react-native";
import { useHorizontalStyles } from "./DividerHorizontal.style";
import { useVerticalStyles } from "./DividerVertical.style";

interface DividerProps {
  /**
   * The weight of the divider.
   *
   * @default "base"
   */
  readonly size?: "base" | "large" | "larger" | "largest";
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
}: DividerProps) {
  const horizontalStyles = useHorizontalStyles();
  const verticalStyles = useVerticalStyles();

  const directionalStyles =
    direction === "horizontal" ? horizontalStyles : verticalStyles;
  const style = [
    directionalStyles.base,
    size === "large" && directionalStyles.large,
    size === "larger" && directionalStyles.larger,
    size === "largest" && directionalStyles.largest,
  ];

  return <View testID={testID} style={style} />;
}
