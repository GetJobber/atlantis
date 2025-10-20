import React, { type PropsWithChildren } from "react";
import classNames from "classnames";
import styles from "./DataTableStyles.module.css";

export function DataTableActions(
  props: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>,
) {
  return (
    <div {...props} className={classNames(styles.actions, props.className)}>
      {props.children}
    </div>
  );
}
