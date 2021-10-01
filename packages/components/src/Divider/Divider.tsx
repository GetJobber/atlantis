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
   * Display the divider vertically
   *
   * @default false
   */
  readonly vertical?: boolean;
}

export function Divider({ size = "base", vertical = false }: DividerProps) {
  const className = classnames(styles.divider, {
    [styles.large]: size === "large",
    [styles.vertical]: vertical,
  });

  const Tag = vertical ? "div" : "hr";
  return <Tag className={className} role="none" />;
}
