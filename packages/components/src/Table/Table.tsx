import React, { ReactElement } from "react";
import styles from "./Table.css";

interface TableProps {
  children: ReactElement | ReactElement[];
}

export function Table({ children }: TableProps) {
  return <table className={styles.table}>{children}</table>;
}
