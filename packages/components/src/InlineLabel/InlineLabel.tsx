import React, { ReactNode } from "react";
import classnames from "classnames";
import styles from "./InlineLabel.css";
import { Typography } from "../Typography";

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
  | "indigo";

interface InlineLabelProps {
  /**
   * The size of the label
   * @default base
   */
  size?: "base" | "large" | "larger";
  /**
   * The color of the label
   * @default "greyBlue"
   */
  color?: InlineLabelColors;
  children: ReactNode;
}

interface SizeMapProps {
  [key: string]: "smaller" | "base" | "large";
}

export function InlineLabel({
  size = "base",
  color = "greyBlue",
  children,
}: InlineLabelProps) {
  const className = classnames(styles.inlineLabel, styles[size], styles[color]);

  const sizeMapper: SizeMapProps = {
    base: "smaller",
    large: "large",
    larger: "large",
  };

  return (
    <span className={className}>
      <Typography element="span" size={sizeMapper[size]}>
        {children}
      </Typography>
    </span>
  );
}
