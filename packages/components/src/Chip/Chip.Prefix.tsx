import React, { PropsWithChildren } from "react";
import styles from "./Chip.css";

export function ChipPrefix({ children }: PropsWithChildren) {
  return <span className={styles.prefix}>{children}</span>;
}
