import React from "react";
import classNames from "classnames";
import styles from "./DataTableHeaderCell.module.css";

export function DataTableHeaderCell(
  props: React.ThHTMLAttributes<HTMLTableCellElement>,
) {
  return (
    <th {...props} className={classNames(styles.headerCell, props.className)}>
      {props.children}
    </th>
  );
}

DataTableHeaderCell.displayName = "DataTableHeaderCell";
