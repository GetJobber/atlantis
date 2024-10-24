import React from "react";
import styles from "./Cell.module.css";
import { Cell } from "./Cell";

export interface CellNumericProps {
  readonly value: number | string;
}

export function CellNumeric({ value }: CellNumericProps) {
  return (
    <Cell align="right">
      <span className={styles.numeric}>{value.toString()}</span>
    </Cell>
  );
}
