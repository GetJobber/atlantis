import { ColumnDef, flexRender, useReactTable } from "@tanstack/react-table";
import React from "react";
import classNames from "classnames";
import { createTableSettings } from "./createTableSettings";
import styles from "./DataTable.css";
import { Footer } from "./Footer";
import { Pagination, Sorting } from "./types";
import { Icon } from "../Icon";

interface DataTableProps<T> {
  /**
   * The actual data that will be used for the table.
   * Typescript should infer T from typeof data.
   *
   */
  data: T[];

  /**
   * Should follow the @tanstack/react-table ColumnDef.
   * I'm not sure if we need to create an abstraction around this
   * specific type, ColumnDef by itself is already very flexible and powerfull enough
   * to enable us to configure the table any way we like.
   * https://tanstack.com/table/v8/docs/guide/column-defs
   *
   */
  columns: ColumnDef<T>[];

  /**
   * Enables pagination, mostly follows:
   * https://tanstack.com/table/v8/docs/api/features/pagination
   *
   */
  pagination?: Pagination;

  /**
   * Enables pagination, mostly follows:
   * https://tanstack.com/table/v8/docs/api/features/sorting#table-options
   *
   */
  sorting?: Sorting;

  height?: number;

  stickyHeader?: boolean;

  pinFirstColumn?: boolean;
}

export function DataTable<T extends object>({
  data,
  columns,
  pagination,
  sorting,
  height,
  stickyHeader,
  pinFirstColumn,
}: DataTableProps<T>) {
  const tableSettings = createTableSettings(data, columns, {
    pagination,
    sorting,
  });

  const stickyClass = classNames({ [styles.stickyHeader]: stickyHeader });

  const tableClasses = classNames(styles.table, {
    [styles.pinFirstColumn]: pinFirstColumn,
  });

  const table = useReactTable(tableSettings);
  return (
    <div className={styles.dataTableContainer}>
      <div className={styles.tableContainer} style={{ height }}>
        <table className={tableClasses}>
          <thead className={stickyClass}>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <>
                          {sorting ? (
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? "cursor-pointer select-none"
                                  : "",
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                              {{
                                asc: <Icon name="longArrowUp" color="green" />,
                                desc: (
                                  <Icon name="longArrowDown" color="green" />
                                ),
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                          ) : (
                            <div>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id}>
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
        </table>
      </div>
      {pagination && (
        <Footer
          table={table}
          itemsPerPage={
            pagination.manualPagination ? pagination.itemsPerPage : undefined
          }
          totalItems={
            pagination.manualPagination
              ? pagination.totalItems
              : table.getCoreRowModel().rows.length
          }
        />
      )}
    </div>
  );
}
