import React, { type HTMLAttributes } from "react";
import classNames from "classnames";
import styles from "./DataTableHeaderCell.module.css";

export function DataTableHeaderCell(
  props: HTMLAttributes<HTMLTableCellElement>,
) {
  return (
    <th {...props} className={classNames(styles.headerCell, props.className)}>
      {props.children}
    </th>
  );
}
