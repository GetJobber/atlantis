import React, { type PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./DataTableTableBody.module.css";

export function DataTableTableBody(
  props: PropsWithChildren<React.HTMLAttributes<HTMLTableSectionElement>>,
) {
  return (
    <tbody className={classNames(styles.tableBody, props.className)} {...props}>
      {props.children}
    </tbody>
  );
}
