import React from "react";
import styles from "./Frame.module.css";
import { FrameProps } from "./types";

export function Frame({ children, n = 16, d = 9 }: FrameProps) {
  return (
    <div
      className={styles.frame}
      style={
        {
          "--public-frame-numerator": n,
          "--public-frame-denominator": d,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
