import type { ReactNode } from "react";
import React from "react";
import classnames from "classnames";
import styles from "./InlineLabel.module.css";
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
  readonly size?: "small" | "base" | "large" | "larger";
  /**
   * The color of the label
   * @default "greyBlue"
   */
  readonly color?: InlineLabelColors;
  readonly children: ReactNode;
}

interface SizeMapProps {
  [key: string]: "small" | "base" | "large";
}

export function InlineLabel({
  size = "base",
  color = "greyBlue",
  children,
}: InlineLabelProps) {
  const className = classnames(styles.inlineLabel, styles[size], styles[color]);

  const sizeMapper: SizeMapProps = {
    small: "small",
    base: "small",
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
