import React, { type PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./DataTableActions.module.css";

export function DataTableActions(
  props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>,
) {
  return (
    <div
      className={classNames(styles.tableActions, props.className)}
      {...props}
    >
      {props.children}
    </div>
  );
}
