import { Row, Table, flexRender } from "@tanstack/react-table";
import classNames from "classnames";
import React from "react";
import { SortDownIcon, SortIcon, SortUpIcon } from "./SortIcon";
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
                style={{
                  width: header.getSize(),
                  minWidth: header.column.columnDef.minSize,
                  maxWidth: header.column.columnDef.maxSize,
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
                        !header.column.getIsSorted() && <SortIcon />}
                    </>
                    {
                      {
                        asc: <SortUpIcon />,
                        desc: <SortDownIcon />,
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
