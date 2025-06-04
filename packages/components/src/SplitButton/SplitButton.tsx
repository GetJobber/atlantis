import React, { PropsWithChildren } from "react";
import styles from "./SplitButton.module.css";

export type SplitButtonProps = PropsWithChildren;

export function SplitButton({ children }: SplitButtonProps) {
  return <div className={styles.splitButton}>{children}</div>;
}
