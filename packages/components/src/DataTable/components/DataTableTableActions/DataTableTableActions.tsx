import React, { type PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./DataTableTableActions.module.css";

export function DataTableTableActions(
  props: PropsWithChildren<{ readonly className?: string }>,
) {
  return (
    <div className={classNames(styles.tableActions, props.className)}>
      {props.children}
    </div>
  );
}
