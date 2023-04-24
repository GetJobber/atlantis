import { Row, Table, flexRender } from "@tanstack/react-table";
import classNames from "classnames";
import React from "react";
import { SortDirection, SortIcon } from "./SortIcon";
import styles from "./DataTable.css";
import { SortingType } from "./types";

interface HeaderProps<T> {
  table: Table<T>;
  stickyHeader?: boolean;
  sorting?: SortingType;
  onRowClick?: (row: Row<T>) => void;
}

export function Header<T extends object>({
  table,
  stickyHeader,
  sorting,
  onRowClick,
}: HeaderProps<T>) {
  const stickyClass = classNames({ [styles.stickyHeader]: stickyHeader });
  console.log("remove me")
  return (
    <thead className={stickyClass}>
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => {
            const isSorting = sorting && header.column.getCanSort();
            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className={
                  isSorting
                    ? classNames(styles.sortableColumn, {
                        [styles.pinFirstHeaderSortable]: !!onRowClick,
                      })
                    : ""
                }
                onClick={
                  sorting ? header.column.getToggleSortingHandler() : undefined
                }
                style={{
                  width: header.getSize(),
                  minWidth: header.column.columnDef.minSize,
                  maxWidth: header.column.columnDef.maxSize,
                  paddingRight: isSorting ? 0 : "inherit",
                }}
              >
                {header.isPlaceholder ? null : (
                  <div>
                    <>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {header.column.getCanSort() &&
                        sorting &&
                        !header.column.getIsSorted() && (
                          <SortIcon direction={SortDirection.equilibrium} />
                        )}
                    </>
                    {
                      {
                        asc: <SortIcon direction={SortDirection.ascending} />,
                        desc: <SortIcon direction={SortDirection.descending} />,
                      }[header.column.getIsSorted() as string]
                    }
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
