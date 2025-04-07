import type { PropsWithChildren } from "react";
import styles from "./VisibleWhenFocused.module.css";

export function VisibleWhenFocused({ children }: PropsWithChildren) {
  return <div className={styles.container}>{children}</div>;
}
