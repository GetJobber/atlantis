import React, { type PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./DataTableTableContainer.module.css";

export function DataTableTableContainer(
  props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>,
) {
  return (
    <div
      className={classNames(styles.tableContainer, props.className)}
      {...props}
    >
      {props.children}
    </div>
  );
}
