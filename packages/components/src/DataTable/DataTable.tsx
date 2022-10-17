import React, { Dispatch, SetStateAction } from "react";
import {
  ColumnDef,
  PaginationState,
  SortingState,
  TableOptions,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Footer } from "./Footer";
import styles from "./DataTable.css";
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
  /**
   * The options to controll the pagination
   *
   * @type {number[]}
   * @memberof Pagination
   */
  itemsPerPage?: number[];
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
  onSortingChange?: Dispatch<SetStateAction<SortingState>>;
}

export function DataTable<T extends object>({
  data,
  columns,
  pagination,
  sorting,
}: DataTableProps<T>) {
  const tableSettings = createTableSettings(data, columns, {
    pagination,
    sorting,
  });

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
        <Footer table={table} itemsPerPage={pagination.itemsPerPage} />
      )}
    </div>
  );
}

function createTableSettings<T>(
  data: T[],
  columns: ColumnDef<T>[],
  options?: { pagination?: Pagination; sorting?: Sorting },
) {
  let tableSettings: TableOptions<T> = {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  };

  tableSettings = addPaginationSettings(tableSettings, options?.pagination);

  tableSettings = addSortingSettings(tableSettings, options?.sorting);

  return tableSettings;
}

function addPaginationSettings<T>(
  tableSettings: TableOptions<T>,
  pagination?: Pagination,
) {
  if (!pagination) return tableSettings;

  const {
    state: paginationState,
    onPaginationChange,
    manualPagination,
  } = pagination;

  const newTableSettings = { ...tableSettings }; //code smell??

  newTableSettings.manualPagination = manualPagination;

  if (manualPagination) {
    if (paginationState) {
      newTableSettings.state = {
        ...newTableSettings.state,
        pagination: paginationState,
      };
    }

    if (onPaginationChange) {
      newTableSettings.onPaginationChange = onPaginationChange;
    }
  } else {
    newTableSettings.getPaginationRowModel = getPaginationRowModel();
  }

  return newTableSettings;
}

function addSortingSettings<T>(
  tableSettings: TableOptions<T>,
  sorting?: Sorting,
) {
  if (!sorting) return tableSettings;

  const { onSortingChange, state: sortingState, manualSorting } = sorting;

  const newTableSettings = { ...tableSettings }; //code smell??

  newTableSettings.manualSorting = sorting.manualSorting;

  if (manualSorting) {
    if (sortingState) {
      newTableSettings.state = {
        ...newTableSettings.state,
        sorting: sortingState,
      };
    }

    if (onSortingChange) {
      newTableSettings.onSortingChange = onSortingChange;
    }
  } else {
    newTableSettings.getSortedRowModel = getSortedRowModel();
  }

  return newTableSettings;
}
