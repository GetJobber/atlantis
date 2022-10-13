import React, { Dispatch, SetStateAction } from "react";
import {
  ColumnDef,
  PaginationState,
  SortingState,
  TableOptions,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Footer } from "./Footer";
import styles from "./DataTable.css";

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
}

interface Pagination {
  /**
   * When manually controlled represents the current pagination state of the table.
   *
   * @type {PaginationState}
   */
  state?: PaginationState;

  /**
   * When manually controlling pagination, you should supply a total pageCount value to the table if you know it.
   * If you do not know how many pages there are, you can set this to -1. (Or should we error?)
   *
   * @type {number}
   */
  pageCount?: number;

  /**
   * If this function is provided, it will be called when the pagination state changes and you will be expected
   * to manage the state yourself. You can pass the managed state back to the table via the state option.
   */
  onPaginationChange?: Dispatch<SetStateAction<PaginationState>>;

  /**
   * Enables manual pagination. If this option is set to true,
   * the table will not automatically paginate and instead will expect you
   * to manually paginate the rows before passing them to the table.
   *
   * @type {boolean}
   */
  manualPagination: boolean;
}

interface Sorting {
  /**
   * Represents the current sorting state of the table.
   *
   * @type {SortingState}
   */
  state?: SortingState;

  /**
   * Enables manual sorting for the table.
   *
   * @type {boolean}
   */
  manualSorting: boolean;

  /**
   * This overrides the default internal state management,
   * so you will need to persist the state change either fully or partially outside of the table.
   */
  onSortingChange?: (newSortingState: SortingState) => void;
}

export function DataTable<T extends object>({
  data,
  columns,
  pagination,
}: DataTableProps<T>) {
  const tableSettings: TableOptions<T> = {
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // pageCount: pagination?.pageCount,
    // state: {
    //   // ...(pagination?.state && { pagination: pagination.state }),
    // },
    // onPaginationChange: pagination?.onPaginationChange,
    // ...(!pagination?.manualPagination && {
    //   getPaginationRowModel: getPaginationRowModel(),
    // }),
  };

  if (pagination) {
    const { state, manualPagination, onPaginationChange } = pagination;

    tableSettings.manualPagination = manualPagination;

    if (manualPagination) {
      if (state) {
        tableSettings.state = { ...tableSettings.state, pagination: state };
      }

      if (onPaginationChange) {
        tableSettings.onPaginationChange = onPaginationChange;
      }
    } else {
      tableSettings.getPaginationRowModel = getPaginationRowModel();
    }
  }

  const table = useReactTable(tableSettings);
  return (
    <div className={styles.dataTable}>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <span>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </span>
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
      {pagination && <Footer table={table} />}
    </div>
  );
}
