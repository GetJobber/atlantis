import {
  ColumnDef,
  PaginationState,
  TableOptions,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { RowSelectionType } from "./DataTable";
import { PaginationType, SortingType } from "./types";

export function createTableSettings<T>(
  data: T[],
  columns: ColumnDef<T>[],
  options?: {
    pagination?: PaginationType;
    sorting?: SortingType;
    selection?: RowSelectionType<T>;
  },
) {
  const { state: paginationState, ...restPaginationSettings } =
    getPaginationSettings(options?.pagination);

  const { state: sortingState, ...restSortingSettings } = getSortingSettings(
    options?.sorting,
  );

  const [selectionState, restSelectionSettings] = getSelectionSettings(
    options?.selection,
  );

  let initialPatinationState: PaginationState | undefined;

  if (options?.pagination?.itemsPerPage) {
    initialPatinationState = {
      pageIndex: 0,
      pageSize: options.pagination.itemsPerPage[0],
    };
  }

  const tableSettings: TableOptions<T> = {
    data,
    columns,
    state: { ...paginationState, ...sortingState, ...selectionState },
    getCoreRowModel: getCoreRowModel(),
    ...restPaginationSettings,
    ...restSortingSettings,
    ...restSelectionSettings,
    initialState: {
      pagination: initialPatinationState,
    },
  };

  return tableSettings;
}

function getSelectionSettings<T>(selection?: RowSelectionType<T>) {
  if (!selection) return [] as const;

  const { rowSelection, ...restSelectionSettings } = selection;

  return [{ rowSelection }, restSelectionSettings] as const;
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
  pagination?: PaginationType,
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

function getSortingSettings<T>(sorting?: SortingType): SortingSettings<T> {
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
