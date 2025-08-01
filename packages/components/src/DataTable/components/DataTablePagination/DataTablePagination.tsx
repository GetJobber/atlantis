import React from "react";
import classNames from "classnames";
import styles from "./DataTablePagination.module.css";

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
    <div className={classNames(styles.pagination, className)} {...props}>
      {children}
    </div>
  );
}
