import React, { type PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./DataTableTable.module.css";

export function DataTableTable(
  props: PropsWithChildren<{ readonly className?: string }>,
) {
  return (
    <table className={classNames(styles.table, props.className)}>
      {props.children}
    </table>
  );
}
