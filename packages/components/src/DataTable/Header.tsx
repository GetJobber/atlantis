import { Row, Table, flexRender } from "@tanstack/react-table";
import classNames from "classnames";
import React from "react";
import styles from "./DataTable.css";
import { Sorting } from "./types";
import { Icon } from "../Icon";

interface HeaderProps<T> {
  table: Table<T>;
  stickyHeader?: boolean;
  sorting?: Sorting;
  onRowClick?: (row: Row<T>) => void;
}

export function Header<T extends object>({
  table,
  stickyHeader,
  sorting,
  onRowClick,
}: HeaderProps<T>) {
  const stickyClass = classNames({ [styles.stickyHeader]: stickyHeader });
  return (
    <thead className={stickyClass}>
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => {
            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={
                  sorting && header.column.getCanSort()
                    ? classNames(styles.sortableColumn, {
                        [styles.pinFirstHeaderSortable]: !!onRowClick,
                      })
                    : ""
                }
                onClick={
                  sorting ? header.column.getToggleSortingHandler() : undefined
                }
              >
                {header.isPlaceholder ? null : (
                  <div>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {{
                      asc: <Icon name="longArrowUp" color="green" />,
                      desc: <Icon name="longArrowDown" color="green" />,
                    }[header.column.getIsSorted() as string] ?? (
                      <svg
                        style={{
                          width: "var(--space-large)",
                          height: "var(--space-large)",
                        }}
                      />
                    )}
                  </div>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}
