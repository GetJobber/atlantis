import React, { ReactElement } from "react";
import styles from "./Table.css";

interface RowProps {
  readonly children: ReactElement | ReactElement[];
}

export function Row({ children }: RowProps) {
  return <tr className={styles.row}>{children}</tr>;
}
