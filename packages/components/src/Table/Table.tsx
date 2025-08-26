import type { ReactElement } from "react";
import React from "react";
import styles from "./Table.module.css";

interface TableProps {
  readonly children: ReactElement | ReactElement[];
}

export function Table({ children }: TableProps) {
  return <table className={styles.table}>{children}</table>;
}
