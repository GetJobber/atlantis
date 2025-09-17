import React, { forwardRef } from "react";
import classNames from "classnames";
import styles from "./DataTableStyles.module.css";

export const DataTableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>((props, ref) => {
  return (
    <tr
      {...props}
      className={classNames(styles.row, props.className)}
      ref={ref}
    >
      {props.children}
    </tr>
  );
});

DataTableRow.displayName = "DataTableRow";
