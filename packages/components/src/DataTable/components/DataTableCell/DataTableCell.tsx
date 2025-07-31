import React, { type HTMLAttributes, forwardRef } from "react";
import classNames from "classnames";
import styles from "./DataTableCell.module.css";

export const DataTableCell = forwardRef<
  HTMLTableCellElement,
  HTMLAttributes<HTMLTableCellElement>
>((props, ref) => {
  return (
    <td
      {...props}
      className={classNames(styles.cell, props.className)}
      ref={ref}
    >
      {props.children}
    </td>
  );
});

DataTableCell.displayName = "DataTableCell";
