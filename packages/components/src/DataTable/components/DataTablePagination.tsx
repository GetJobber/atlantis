import React from "react";
import classNames from "classnames";
import styles from "./DataTableStyles.module.css";

export interface DataTablePaginationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: React.ReactNode;
}

export function DataTablePagination({
  children,
  className,
  ...props
}: DataTablePaginationProps) {
  return (
    <div {...props} className={classNames(styles.pagination, className)}>
      {children}
    </div>
  );
}
