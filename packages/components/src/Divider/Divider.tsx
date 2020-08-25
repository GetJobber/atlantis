import React from "react";
import classnames from "classnames";
import styles from "./Divider.css";

interface DividerProps {
  /**
   * Width of the divider
   */
  readonly size?: "base" | "large";
}

export function Divider({ size = "base" }: DividerProps) {
  const className = classnames(styles.divider, {
    [styles.large]: size === "large",
  });

  return <hr className={className} />;
}
