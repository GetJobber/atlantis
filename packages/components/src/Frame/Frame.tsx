import React from "react";
import styles from "./Frame.module.css";
import { FrameProps } from "./types";

export function Frame({ children, aspectX = 16, aspectY = 9 }: FrameProps) {
  return (
    <div
      className={styles.frame}
      style={
        {
          "--public-frame-numerator": aspectX,
          "--public-frame-denominator": aspectY,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
