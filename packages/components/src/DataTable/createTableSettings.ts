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

  const { manualPagination } = pagination;

  paginationSettings.manualPagination = manualPagination;

  if (manualPagination) {
    const { state, pageCount, onPaginationChange } = pagination;

    paginationSettings.state = { pagination: state };

    paginationSettings.pageCount = pageCount;

    paginationSettings.onPaginationChange = onPaginationChange;
  } else {
    paginationSettings.getPaginationRowModel = getPaginationRowModel();
  }

  return paginationSettings;
}

type SortingSettings<T> = Pick<
  TableOptions<T>,
  | "state"
  | "manualSorting"
  | "onSortingChange"
  | "getSortedRowModel"
  | "enableSortingRemoval"
>;

function getSortingSettings<T>(sorting?: Sorting): SortingSettings<T> {
  const sortingSettings: SortingSettings<T> = {};

  if (!sorting) return sortingSettings;

  const { manualSorting } = sorting;

  sortingSettings.manualSorting = manualSorting;

  if (manualSorting) {
    const { onSortingChange, state, enableSortingRemoval } = sorting;

    sortingSettings.state = { sorting: state };

    sortingSettings.onSortingChange = onSortingChange;

    sortingSettings.enableSortingRemoval = enableSortingRemoval ?? true;
  } else {
    sortingSettings.getSortedRowModel = getSortedRowModel();
  }

  return sortingSettings;
}
