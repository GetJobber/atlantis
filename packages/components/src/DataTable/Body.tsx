import { Row, Table, flexRender } from "@tanstack/react-table";
import classNames from "classnames";
import React, { useCallback } from "react";
import styles from "./DataTable.css";
import { Heading } from "../Heading";
import { Text } from "../Text";

interface BodyProps<T> {
  table: Table<T>;
  onRowClick?: (row: Row<T>) => void;
  height?: number;
}

export function Body<T extends object>({
  table,
  onRowClick,
  height,
}: BodyProps<T>) {
  const bodyRowClasses = classNames({ [styles.clickableRow]: !!onRowClick });

  const handleRowClick = useCallback(
    (row: Row<T>) => () => {
      if (onRowClick == undefined) return;
      onRowClick(row);
    },
    [onRowClick],
  );

  return table.getRowModel().rows.length ? (
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
  ) : (
    <div className={classNames(styles.emptyState)} style={{ height }}>
      <div className={classNames(styles.emptyMessage)}>
        <Heading level={5}>No items found</Heading>
        <Text>Update your search or filter selection</Text>
      </div>
    </div>
  );
}
