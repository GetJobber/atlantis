import React, { ReactNode } from "react";
import classnames from "classnames";
import styles from "./InlineLabel.css";

interface InlineLabelProps {
  size?: "normal" | "medium" | "large";
  color?:
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
  children: ReactNode;
}

export function InlineLabel({
  size = "normal",
  color = "greyBlue",
  children,
}: InlineLabelProps) {
  const className = classnames(styles.inlineLabel, styles[size], styles[color]);

  return <span className={className}>{children}</span>;
}
