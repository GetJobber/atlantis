import React from "react";
import classNames from "classnames";
import styles from "./DataTableStyles.module.css";

export interface DataTableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  readonly children: React.ReactNode;
}

export function DataTableFooter({
  children,
  className,
  ...props
}: DataTableFooterProps) {
  return (
    <tfoot {...props} className={classNames(styles.footer, className)}>
      {children}
    </tfoot>
  );
}
