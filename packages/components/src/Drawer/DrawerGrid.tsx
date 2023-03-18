import React, { ReactElement } from "react";
import styles from "./DrawerGrid.css";

interface DrawerGridProps {
  children: ReactElement | ReactElement[];
}

export function DrawerGrid({ children }: DrawerGridProps) {
  return <div className={styles.drawerGrid}>{children}</div>;
}
