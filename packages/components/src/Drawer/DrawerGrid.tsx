import type { ReactElement } from "react";
import React from "react";
import styles from "./DrawerGrid.module.css";

interface DrawerGridProps {
  readonly children: ReactElement | ReactElement[];
}

export function DrawerGrid({ children }: DrawerGridProps) {
  return <div className={styles.drawerGrid}>{children}</div>;
}
