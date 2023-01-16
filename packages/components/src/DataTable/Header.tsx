import { Row, Table, flexRender } from "@tanstack/react-table";
import classNames from "classnames";
import React from "react";
import { SortDirection, SortIcon } from "./SortIcon";
import styles from "./DataTable.css";
import { SortingType } from "./types";

export enum ColumnAlignment {
  right,
  left,
}

interface HeaderProps<T> {
  table: Table<T>;
  stickyHeader?: boolean;
  sorting?: SortingType;
  onRowClick?: (row: Row<T>) => void;
  columnAlignment?: ColumnAlignment[];
}

export function Header<T extends object>({
  table,
  stickyHeader,
  sorting,
  onRowClick,
  columnAlignment,
}: HeaderProps<T>) {
  const stickyClass = classNames({ [styles.stickyHeader]: stickyHeader });
  return (
    <thead className={stickyClass}>
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => {
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
                        !header.column.getIsSorted() && (
                          <SortIcon
                            direction={SortDirection.equilibrium}
                            alignRight={
                              columnAlignment
                                ? columnAlignment[index] ==
                                  ColumnAlignment.right
                                  ? true
                                  : false
                                : false
                            }
                          />
                        )}
                    </>
                    {
                      {
                        asc: (
                          <SortIcon
                            direction={SortDirection.ascending}
                            alignRight={
                              columnAlignment
                                ? columnAlignment[index] ==
                                  ColumnAlignment.right
                                  ? true
                                  : false
                                : false
                            }
                          />
                        ),
                        desc: (
                          <SortIcon
                            direction={SortDirection.descending}
                            alignRight={
                              columnAlignment
                                ? columnAlignment[index] ==
                                  ColumnAlignment.right
                                  ? true
                                  : false
                                : false
                            }
                          />
                        ),
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
