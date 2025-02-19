import React from "react";
import { View } from "react-native";
import { styles } from "./InlineLabel.style";
import { TextAlign, TextTransform, Typography } from "../Typography";

export type InlineLabelColors =
  | "greyBlue"
  | "red"
  | "orange"
  | "green"
  | "blue"
  | "yellow"
  | "lime"
  | "purple"
  | "pink"
  | "teal"
  | "yellowGreen"
  | "blueDark"
  | "lightBlue"
  | "indigo"
  | "navy";

export interface InlineLabelType {
  readonly inlineLabel: string;
  readonly inlineLabelColor?: InlineLabelColors;
}

interface InlineLabelProps {
  /**
   * The size of the label
   * @default default
   */
  readonly size?: "smaller" | "small" | "default" | "large" | "larger";
  /**
   * The color of the label
   * @default "greyBlue"
   */
  readonly color?: InlineLabelColors;
  /**
   * Text transform to apply to the label text
   * @default uppercase
   */
  readonly transform?: TextTransform;

  /**
   * The alignment of the text inside the label
   * @default start
   */
  readonly alignment?: TextAlign;

  readonly children: string;
}

interface TextSizeMap {
  [key: string]: "smallest" | "smaller" | "small" | "default" | "large";
}

interface TextColorMap {
  [key: string]:
    | "greyBlueDark"
    | "redDark"
    | "orangeDark"
    | "greenDark"
    | "blueDark"
    | "yellowDark"
    | "limeDark"
    | "purpleDark"
    | "pinkDark"
    | "tealDark"
    | "yellowGreenDark"
    | "white"
    | "lightBlueDark"
    | "indigoDark"
    | "navy";
}

export function InlineLabel({
  size = "default",
  color = "greyBlue",
  transform = "uppercase",
  alignment = "start",
  children,
}: InlineLabelProps): JSX.Element {
  const sizeMapper: TextSizeMap = {
    smaller: "smaller",
    small: "smaller",
    default: "small",
    large: "default",
    larger: "large",
  };

  const textColorMapper: TextColorMap = {
    greyBlue: "greyBlueDark",
    red: "redDark",
    orange: "orangeDark",
    green: "greenDark",
    blue: "blueDark",
    yellow: "yellowDark",
    lime: "limeDark",
    purple: "purpleDark",
    pink: "pinkDark",
    teal: "tealDark",
    yellowGreen: "yellowGreenDark",
    blueDark: "white",
    lightBlue: "lightBlueDark",
    indigo: "indigoDark",
    navy: "navy",
  };

  return (
    <View style={[styles.inlineLabel, styles[size], styles[color]]}>
      <Typography
        color={textColorMapper[color]}
        size={sizeMapper[size]}
        transform={transform}
        align={alignment}
      >
        {children}
      </Typography>
    </View>
  );
}
