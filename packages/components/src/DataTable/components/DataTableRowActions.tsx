import React, { type PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./DataTableStyles.module.css";

export function DataTableRowActions(
  props: PropsWithChildren<{ readonly className?: string }>,
) {
  return (
    <div className={classNames(styles.rowActions, props.className)}>
      {props.children}
    </div>
  );
}
