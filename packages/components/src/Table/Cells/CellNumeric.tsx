import React from "react";
import styles from "./Cell.css";
import { Cell } from "./Cell";

export interface CellNumericProps {
  value: number | string;
}

export function CellNumeric({ value }: CellNumericProps) {
  return (
    <Cell align="right">
      <span className={styles.numeric}>{value.toString()}</span>
    </Cell>
  );
}
