import React, { type PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./DataTableStyles.module.css";

export function DataTableActions(
  props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>,
) {
  return (
    <div className={classNames(styles.actions, props.className)} {...props}>
      {props.children}
    </div>
  );
}
