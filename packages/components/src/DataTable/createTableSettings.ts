import {
  ColumnDef,
  TableOptions,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Pagination, Sorting } from "./types";

export function createTableSettings<T>(
  data: T[],
  columns: ColumnDef<T>[],
  options?: { pagination?: Pagination; sorting?: Sorting },
) {
  const { state: paginationState, ...restPaginationSettings } =
    getPaginationSettings(options?.pagination);

  const { state: sortingState, ...restSortingSettings } = getSortingSettings(
    options?.sorting,
  );

  const tableSettings: TableOptions<T> = {
    data,
    columns,
    state: { ...paginationState, ...sortingState },
    getCoreRowModel: getCoreRowModel(),
    ...restPaginationSettings,
    ...restSortingSettings,
  };

  return tableSettings;
}

type PaginationSettings<T> = Pick<
  TableOptions<T>,
  | "state"
  | "pageCount"
  | "onPaginationChange"
  | "manualPagination"
  | "getPaginationRowModel"
>;

function getPaginationSettings<T>(
  pagination?: Pagination,
): PaginationSettings<T> {
  const paginationSettings: PaginationSettings<T> = {};

  if (!pagination) {
    return paginationSettings;
  }

  const { manualPagination, state, pageCount, onPaginationChange } = pagination;

  paginationSettings.manualPagination = manualPagination;

  if (manualPagination) {
    if (state) paginationSettings.state = { pagination: state };

    if (pageCount) paginationSettings.pageCount = pageCount;

    if (onPaginationChange) {
      paginationSettings.onPaginationChange = onPaginationChange;
    }
  } else {
    paginationSettings.getPaginationRowModel = getPaginationRowModel();
  }

  return paginationSettings;
}

type SortingSettings<T> = Pick<
  TableOptions<T>,
  "state" | "manualSorting" | "onSortingChange" | "getSortedRowModel"
>;

function getSortingSettings<T>(sorting?: Sorting): SortingSettings<T> {
  const sortingSettings: SortingSettings<T> = {};

  if (!sorting) return sortingSettings;

  const { manualSorting, onSortingChange, state } = sorting;

  sortingSettings.manualSorting = manualSorting;

  if (manualSorting) {
    if (state) sortingSettings.state = { sorting: state };

    if (onSortingChange) sortingSettings.onSortingChange = onSortingChange;
  } else {
    sortingSettings.getSortedRowModel = getSortedRowModel();
  }

  return sortingSettings;
}
