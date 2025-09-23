import React, { type PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./DataTableStyles.module.css";

export function DataTableTable(
  props: PropsWithChildren<React.HTMLAttributes<HTMLTableElement>>,
) {
  return (
    <table
      {...props}
      className={classNames(styles.tableElement, props.className)}
    >
      {props.children}
    </table>
  );
}
