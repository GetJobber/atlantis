import { Row, Table, flexRender } from "@tanstack/react-table";
import classNames from "classnames";
import React, { ReactNode, useCallback } from "react";
import styles from "./DataTable.css";
import { BodyLoading } from "./BodyLoading";

interface BodyProps<T> {
  table: Table<T>;
  onRowClick?: (row: Row<T>) => void;
  height?: number;
  emptyState?: ReactNode | ReactNode[];
  loading: boolean;
}

export function Body<T extends object>({
  table,
  onRowClick,
  emptyState,
  loading,
}: BodyProps<T>) {
  const bodyRowClasses = classNames({ [styles.clickableRow]: !!onRowClick });

  const handleRowClick = useCallback(
    (row: Row<T>) => () => {
      if (onRowClick == undefined) return;
      onRowClick(row);
    },
    [onRowClick],
  );

  if (loading) {
    return <BodyLoading table={table} />;
  }

  return (
    <>
      table.getRowModel().rows.length ? (
      <tbody>
        {table.getRowModel().rows.map(row => {
          return (
            <tr
              key={row.id}
              onClick={handleRowClick(row)}
              className={bodyRowClasses}
            >
              {row.getVisibleCells().map(cell => {
                return (
                  <td
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      minWidth: cell.column.columnDef.minSize,
                      maxWidth: cell.column.columnDef.maxSize,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      ) : (<div className={classNames(styles.emptyState)}>{emptyState}</div>)
    </>
  );
}
