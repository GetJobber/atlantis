import React, { forwardRef } from "react";
import classNames from "classnames";
import styles from "./DataTableRow.module.css";

export const DataTableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>((props, ref) => {
  return (
    <tr
      className={classNames(styles.row, props.className)}
      ref={ref}
      {...props}
    >
      {props.children}
    </tr>
  );
});

DataTableRow.displayName = "DataTableRow";
