import React, { ReactElement } from "react";
import styles from "./Table.css";

interface TableProps {
  readonly children: ReactElement | ReactElement[];
}

export function Table({ children }: TableProps) {
  return <table className={styles.table}>{children}</table>;
}
