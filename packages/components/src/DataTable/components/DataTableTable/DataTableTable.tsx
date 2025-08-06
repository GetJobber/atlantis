import React, { type PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./DataTableTable.module.css";

export function DataTableTable(
  props: PropsWithChildren<React.HTMLAttributes<HTMLTableElement>>,
) {
  return (
    <table
      className={classNames(styles.tableElement, props.className)}
      {...props}
    >
      {props.children}
    </table>
  );
}
