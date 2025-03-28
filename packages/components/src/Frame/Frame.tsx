import React from "react";
import styles from "./Frame.module.css";

export const Frame = ({
  children,
  n = 16,
  d = 9,
}: {
  readonly children: React.ReactNode;
  readonly n?: number;
  readonly d?: number;
}) => {
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
};
