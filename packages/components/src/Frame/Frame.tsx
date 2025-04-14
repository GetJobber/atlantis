import React from "react";
import styles from "./Frame.module.css";
import { FrameProps } from "./types";

export function Frame({
  children,
  aspectX = 16,
  aspectY = 9,
  as: Tag = "div",
}: FrameProps) {
  return (
    <Tag
      className={styles.frame}
      style={
        {
          "--public-frame-numerator": aspectX,
          "--public-frame-denominator": aspectY,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
