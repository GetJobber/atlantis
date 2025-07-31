import React, { type PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./DataTableTableBody.module.css";

export function DataTableTableBody(
  props: PropsWithChildren<{ readonly className?: string }>,
) {
  return (
    <tbody className={classNames(styles.tableBody, props.className)}>
      {props.children}
    </tbody>
  );
}
