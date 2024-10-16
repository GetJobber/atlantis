import React from "react";
import classnames from "classnames";
import styles from "./Divider.module.css";

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
}

export function Divider({
  size = "base",
  direction = "horizontal",
}: DividerProps) {
  const className = classnames(styles.divider, {
    [styles.large]: size === "large",
    [styles.larger]: size === "larger",
    [styles.largest]: size === "largest",
    [styles.horizontal]: direction == "horizontal",
    [styles.vertical]: direction == "vertical",
  });

  return <div className={className} role="none presentation" />;
}
