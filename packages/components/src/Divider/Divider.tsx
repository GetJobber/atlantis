import React from "react";
import classnames from "classnames";
import styles from "./Divider.css";

interface DividerProps {
  /**
   * The weight of the divider.
   *
   * @default "base"
   */
  readonly size?: "base" | "large";
  /**
   * The direction of the divider
   *
   * @default "horizontal"
   */
  readonly direction?: "horizontal" | "vertical";
}

export function Divider({
  size = "base",
  direction = "horizontal",
}: DividerProps) {
  const className = classnames(styles.divider, {
    [styles.large]: size === "large",
    [styles.horizontal]: direction == "horizontal",
    [styles.vertical]: direction == "vertical",
  });

  return <div className={className} role="none presentation" />;
}
