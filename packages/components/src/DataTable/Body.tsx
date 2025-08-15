import type { Row, Table } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import classNames from "classnames";
import type { ReactNode } from "react";
import React, { useCallback } from "react";
import styles from "./DataTable.module.css";
import { BodyLoading } from "./BodyLoading";

interface BodyProps<T> {
  readonly table: Table<T>;
  readonly onRowClick?: (row: Row<T>) => void;
  readonly emptyState?: ReactNode | ReactNode[];
  readonly loading: boolean;
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
      {table.getRowModel().rows.length ? (
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      ) : (
        <tbody>
          <tr className={bodyRowClasses}>
            <td
              colSpan={table.getAllColumns().length}
              className={styles.emptyStateCell}
            >
              <div className={styles.emptyState}>{emptyState}</div>
            </td>
          </tr>
        </tbody>
      )}
    </>
  );
}
