import React, { ReactElement } from "react";
import styles from "./Table.css";

interface CellProps {
  children?: ReactElement | ReactElement[] | string;
}

export function Cell({ children }: CellProps) {
  return <td className={styles.cell}>{children}</td>;
}
