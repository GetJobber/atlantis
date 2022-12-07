/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import "@tanstack/react-table";

declare module "@tanstack/table-core" {
  type VisibilityState = Record<string, boolean>;
  interface VisibilityTableState {
    columnVisibility: VisibilityState;
  }
  interface VisibilityOptions {
    onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
    enableHiding?: boolean;
  }
  interface VisibilityDefaultOptions {
    onColumnVisibilityChange: OnChangeFn<VisibilityState>;
  }
  interface VisibilityInstance<TData extends RowData> {
    getVisibleFlatColumns: () => Column<TData, unknown>[];
    getVisibleLeafColumns: () => Column<TData, unknown>[];
    getLeftVisibleLeafColumns: () => Column<TData, unknown>[];
    getRightVisibleLeafColumns: () => Column<TData, unknown>[];
    getCenterVisibleLeafColumns: () => Column<TData, unknown>[];
    setColumnVisibility: (updater: Updater<VisibilityState>) => void;
    resetColumnVisibility: (defaultState?: boolean) => void;
    toggleAllColumnsVisible: (value?: boolean) => void;
    getIsAllColumnsVisible: () => boolean;
    getIsSomeColumnsVisible: () => boolean;
    getToggleAllColumnsVisibilityHandler: () => (event: unknown) => void;
  }
  interface VisibilityColumnDef {
    enableHiding?: boolean;
  }
  interface VisibilityRow<TData extends RowData> {
    _getAllVisibleCells: () => Cell<TData, unknown>[];
    getVisibleCells: () => Cell<TData, unknown>[];
  }
  interface VisibilityColumn {
    getCanHide: () => boolean;
    getIsVisible: () => boolean;
    toggleVisibility: (value?: boolean) => void;
    getToggleVisibilityHandler: () => (event: unknown) => void;
  }
  const Visibility: TableFeature;

  interface ColumnOrderTableState {
    columnOrder: ColumnOrderState;
  }
  type ColumnOrderState = string[];
  interface ColumnOrderOptions {
    onColumnOrderChange?: OnChangeFn<ColumnOrderState>;
  }
  interface ColumnOrderDefaultOptions {
    onColumnOrderChange: OnChangeFn<ColumnOrderState>;
  }
  interface ColumnOrderInstance<TData extends RowData> {
    setColumnOrder: (updater: Updater<ColumnOrderState>) => void;
    resetColumnOrder: (defaultState?: boolean) => void;
    _getOrderColumnsFn: () => (
      columns: Column<TData, unknown>[],
    ) => Column<TData, unknown>[];
  }
  const Ordering: TableFeature;

  type ColumnPinningPosition = false | "left" | "right";
  interface ColumnPinningState {
    left?: string[];
    right?: string[];
  }
  interface ColumnPinningTableState {
    columnPinning: ColumnPinningState;
  }
  interface ColumnPinningOptions {
    onColumnPinningChange?: OnChangeFn<ColumnPinningState>;
    enablePinning?: boolean;
  }
  interface ColumnPinningDefaultOptions {
    onColumnPinningChange: OnChangeFn<ColumnPinningState>;
  }
  interface ColumnPinningColumnDef {
    enablePinning?: boolean;
  }
  interface ColumnPinningColumn {
    getCanPin: () => boolean;
    getPinnedIndex: () => number;
    getIsPinned: () => ColumnPinningPosition;
    pin: (position: ColumnPinningPosition) => void;
  }
  interface ColumnPinningRow<TData extends RowData> {
    getLeftVisibleCells: () => Cell<TData, unknown>[];
    getCenterVisibleCells: () => Cell<TData, unknown>[];
    getRightVisibleCells: () => Cell<TData, unknown>[];
  }
  interface ColumnPinningInstance<TData extends RowData> {
    setColumnPinning: (updater: Updater<ColumnPinningState>) => void;
    resetColumnPinning: (defaultState?: boolean) => void;
    getIsSomeColumnsPinned: (position?: ColumnPinningPosition) => boolean;
    getLeftLeafColumns: () => Column<TData, unknown>[];
    getRightLeafColumns: () => Column<TData, unknown>[];
    getCenterLeafColumns: () => Column<TData, unknown>[];
  }
  const Pinning: TableFeature;

  interface CoreHeaderGroup<TData extends RowData> {
    id: string;
    depth: number;
    headers: Header<TData, unknown>[];
  }
  interface HeaderContext<TData, TValue> {
    table: Table<TData>;
    header: Header<TData, TValue>;
    column: Column<TData, TValue>;
  }
  interface CoreHeader<TData extends RowData, TValue> {
    id: string;
    index: number;
    depth: number;
    column: Column<TData, TValue>;
    headerGroup: HeaderGroup<TData>;
    subHeaders: Header<TData, TValue>[];
    colSpan: number;
    rowSpan: number;
    getLeafHeaders: () => Header<TData, unknown>[];
    isPlaceholder: boolean;
    placeholderId?: string;
    getContext: () => HeaderContext<TData, TValue>;
  }
  interface HeadersInstance<TData extends RowData> {
    getHeaderGroups: () => HeaderGroup<TData>[];
    getLeftHeaderGroups: () => HeaderGroup<TData>[];
    getCenterHeaderGroups: () => HeaderGroup<TData>[];
    getRightHeaderGroups: () => HeaderGroup<TData>[];
    getFooterGroups: () => HeaderGroup<TData>[];
    getLeftFooterGroups: () => HeaderGroup<TData>[];
    getCenterFooterGroups: () => HeaderGroup<TData>[];
    getRightFooterGroups: () => HeaderGroup<TData>[];
    getFlatHeaders: () => Header<TData, unknown>[];
    getLeftFlatHeaders: () => Header<TData, unknown>[];
    getCenterFlatHeaders: () => Header<TData, unknown>[];
    getRightFlatHeaders: () => Header<TData, unknown>[];
    getLeafHeaders: () => Header<TData, unknown>[];
    getLeftLeafHeaders: () => Header<TData, unknown>[];
    getCenterLeafHeaders: () => Header<TData, unknown>[];
    getRightLeafHeaders: () => Header<TData, unknown>[];
  }
  const Headers: TableFeature;
  function buildHeaderGroups<TData extends RowData>(
    allColumns: Column<TData, unknown>[],
    columnsToGroup: Column<TData, unknown>[],
    table: Table<TData>,
    headerFamily?: "center" | "left" | "right",
  ): HeaderGroup<TData>[];

  const filterFns: {
    includesString: FilterFn<any>;
    includesStringSensitive: FilterFn<any>;
    equalsString: FilterFn<any>;
    arrIncludes: FilterFn<any>;
    arrIncludesAll: FilterFn<any>;
    arrIncludesSome: FilterFn<any>;
    equals: FilterFn<any>;
    weakEquals: FilterFn<any>;
    inNumberRange: FilterFn<any>;
  };
  type BuiltInFilterFn = keyof typeof filterFns;

  interface FiltersTableState {
    columnFilters: ColumnFiltersState;
    globalFilter: any;
  }
  type ColumnFiltersState = ColumnFilter[];
  interface ColumnFilter {
    id: string;
    value: unknown;
  }
  interface ResolvedColumnFilter<TData extends RowData> {
    id: string;
    resolvedValue: unknown;
    filterFn: FilterFn<TData>;
  }
  interface FilterFn<TData extends RowData> {
    (
      row: Row<TData>,
      columnId: string,
      filterValue: any,
      addMeta: (meta: FilterMeta) => void,
    ): boolean;
    resolveFilterValue?: TransformFilterValueFn<TData>;
    autoRemove?: ColumnFilterAutoRemoveTestFn<TData>;
  }
  type TransformFilterValueFn<TData extends RowData> = (
    value: any,
    column?: Column<TData, unknown>,
  ) => unknown;
  type ColumnFilterAutoRemoveTestFn<TData extends RowData> = (
    value: any,
    column?: Column<TData, unknown>,
  ) => boolean;
  type CustomFilterFns<TData extends RowData> = Record<string, FilterFn<TData>>;
  type FilterFnOption<TData extends RowData> =
    | "auto"
    | BuiltInFilterFn
    | keyof FilterFns
    | FilterFn<TData>;
  interface FiltersColumnDef<TData extends RowData> {
    filterFn?: FilterFnOption<TData>;
    enableColumnFilter?: boolean;
    enableGlobalFilter?: boolean;
  }
  interface FiltersColumn<TData extends RowData> {
    getAutoFilterFn: () => FilterFn<TData> | undefined;
    getFilterFn: () => FilterFn<TData> | undefined;
    setFilterValue: (updater: Updater<any>) => void;
    getCanFilter: () => boolean;
    getCanGlobalFilter: () => boolean;
    getFacetedRowModel: () => RowModel<TData>;
    _getFacetedRowModel?: () => RowModel<TData>;
    getIsFiltered: () => boolean;
    getFilterValue: () => unknown;
    getFilterIndex: () => number;
    getFacetedUniqueValues: () => Map<any, number>;
    _getFacetedUniqueValues?: () => Map<any, number>;
    getFacetedMinMaxValues: () => undefined | [number, number];
    _getFacetedMinMaxValues?: () => undefined | [number, number];
  }
  interface FiltersRow<TData extends RowData> {
    columnFilters: Record<string, boolean>;
    columnFiltersMeta: Record<string, FilterMeta>;
  }
  type FiltersOptions<TData extends RowData> = {
    enableFilters?: boolean;
    manualFiltering?: boolean;
    filterFromLeafRows?: boolean;
    getFilteredRowModel?: (table: Table<any>) => () => RowModel<any>;
    onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
    enableColumnFilters?: boolean;
    globalFilterFn?: FilterFnOption<TData>;
    onGlobalFilterChange?: OnChangeFn<any>;
    enableGlobalFilter?: boolean;
    getColumnCanGlobalFilter?: (column: Column<TData, unknown>) => boolean;
    getFacetedRowModel?: (
      table: Table<TData>,
      columnId: string,
    ) => () => RowModel<TData>;
    getFacetedUniqueValues?: (
      table: Table<TData>,
      columnId: string,
    ) => () => Map<any, number>;
    getFacetedMinMaxValues?: (
      table: Table<TData>,
      columnId: string,
    ) => () => undefined | [number, number];
  } & (keyof FilterFns extends never
    ? {
        filterFns?: Record<string, FilterFn<any>>;
      }
    : {
        filterFns: Record<keyof FilterFns, FilterFn<any>>;
      });
  interface FiltersInstance<TData extends RowData> {
    setColumnFilters: (updater: Updater<ColumnFiltersState>) => void;
    resetColumnFilters: (defaultState?: boolean) => void;
    getPreFilteredRowModel: () => RowModel<TData>;
    getFilteredRowModel: () => RowModel<TData>;
    _getFilteredRowModel?: () => RowModel<TData>;
    setGlobalFilter: (updater: Updater<any>) => void;
    resetGlobalFilter: (defaultState?: boolean) => void;
    getGlobalAutoFilterFn: () => FilterFn<TData> | undefined;
    getGlobalFilterFn: () => FilterFn<TData> | undefined;
    getGlobalFacetedRowModel: () => RowModel<TData>;
    _getGlobalFacetedRowModel?: () => RowModel<TData>;
    getGlobalFacetedUniqueValues: () => Map<any, number>;
    _getGlobalFacetedUniqueValues?: () => Map<any, number>;
    getGlobalFacetedMinMaxValues: () => undefined | [number, number];
    _getGlobalFacetedMinMaxValues?: () => undefined | [number, number];
  }
  const Filters: TableFeature;
  function shouldAutoRemoveFilter<TData extends RowData>(
    filterFn?: FilterFn<TData>,
    value?: any,
    column?: Column<TData, unknown>,
  ): boolean;

  const reSplitAlphaNumeric: RegExp;
  const sortingFns: {
    alphanumeric: SortingFn<any>;
    alphanumericCaseSensitive: SortingFn<any>;
    text: SortingFn<any>;
    textCaseSensitive: SortingFn<any>;
    datetime: SortingFn<any>;
    basic: SortingFn<any>;
  };
  type BuiltInSortingFn = keyof typeof sortingFns;

  type SortDirection = "asc" | "desc";
  interface ColumnSort {
    id: string;
    desc: boolean;
  }
  type SortingState = ColumnSort[];
  interface SortingTableState {
    sorting: SortingState;
  }
  interface SortingFn<TData extends RowData> {
    (rowA: Row<TData>, rowB: Row<TData>, columnId: string): number;
  }
  type CustomSortingFns<TData extends RowData> = Record<
    string,
    SortingFn<TData>
  >;
  type SortingFnOption<TData extends RowData> =
    | "auto"
    | keyof SortingFns
    | BuiltInSortingFn
    | SortingFn<TData>;
  interface SortingColumnDef<TData extends RowData> {
    sortingFn?: SortingFnOption<TData>;
    sortDescFirst?: boolean;
    enableSorting?: boolean;
    enableMultiSort?: boolean;
    invertSorting?: boolean;
    sortUndefined?: false | -1 | 1;
  }
  interface SortingColumn<TData extends RowData> {
    getAutoSortingFn: () => SortingFn<TData>;
    getAutoSortDir: () => SortDirection;
    getSortingFn: () => SortingFn<TData>;
    getFirstSortDir: () => SortDirection;
    getNextSortingOrder: () => SortDirection | false;
    getCanSort: () => boolean;
    getCanMultiSort: () => boolean;
    getSortIndex: () => number;
    getIsSorted: () => false | SortDirection;
    clearSorting: () => void;
    toggleSorting: (desc?: boolean, isMulti?: boolean) => void;
    getToggleSortingHandler: () => undefined | ((event: unknown) => void);
  }
  type SortingOptions<TData extends RowData> = {
    manualSorting?: boolean;
    onSortingChange?: OnChangeFn<SortingState>;
    enableSorting?: boolean;
    enableSortingRemoval?: boolean;
    enableMultiRemove?: boolean;
    enableMultiSort?: boolean;
    sortDescFirst?: boolean;
    getSortedRowModel?: (table: Table<any>) => () => RowModel<any>;
    maxMultiSortColCount?: number;
    isMultiSortEvent?: (e: unknown) => boolean;
  } & (keyof SortingFns extends never
    ? {
        sortingFns?: Record<string, SortingFn<any>>;
      }
    : {
        sortingFns: Record<keyof SortingFns, SortingFn<any>>;
      });
  interface SortingInstance<TData extends RowData> {
    setSorting: (updater: Updater<SortingState>) => void;
    resetSorting: (defaultState?: boolean) => void;
    getPreSortedRowModel: () => RowModel<TData>;
    getSortedRowModel: () => RowModel<TData>;
    _getSortedRowModel?: () => RowModel<TData>;
  }
  const Sorting: TableFeature;

  const aggregationFns: {
    sum: AggregationFn<any>;
    min: AggregationFn<any>;
    max: AggregationFn<any>;
    extent: AggregationFn<any>;
    mean: AggregationFn<any>;
    median: AggregationFn<any>;
    unique: AggregationFn<any>;
    uniqueCount: AggregationFn<any>;
    count: AggregationFn<any>;
  };
  type BuiltInAggregationFn = keyof typeof aggregationFns;

  type GroupingState = string[];
  interface GroupingTableState {
    grouping: GroupingState;
  }
  type AggregationFn<TData extends RowData> = (
    columnId: string,
    leafRows: Row<TData>[],
    childRows: Row<TData>[],
  ) => any;
  type CustomAggregationFns = Record<string, AggregationFn<any>>;
  type AggregationFnOption<TData extends RowData> =
    | "auto"
    | keyof AggregationFns
    | BuiltInAggregationFn
    | AggregationFn<TData>;
  interface GroupingColumnDef<TData extends RowData, TValue> {
    aggregationFn?: AggregationFnOption<TData>;
    aggregatedCell?: ColumnDefTemplate<
      ReturnType<Cell<TData, TValue>["getContext"]>
    >;
    enableGrouping?: boolean;
  }
  interface GroupingColumn<TData extends RowData> {
    getCanGroup: () => boolean;
    getIsGrouped: () => boolean;
    getGroupedIndex: () => number;
    toggleGrouping: () => void;
    getToggleGroupingHandler: () => () => void;
    getAutoAggregationFn: () => AggregationFn<TData> | undefined;
    getAggregationFn: () => AggregationFn<TData> | undefined;
  }
  interface GroupingRow {
    groupingColumnId?: string;
    groupingValue?: unknown;
    getIsGrouped: () => boolean;
    _groupingValuesCache: Record<string, any>;
  }
  interface GroupingCell {
    getIsGrouped: () => boolean;
    getIsPlaceholder: () => boolean;
    getIsAggregated: () => boolean;
  }
  interface ColumnDefaultOptions {
    onGroupingChange: OnChangeFn<GroupingState>;
    enableGrouping: boolean;
  }
  type GroupingOptions = {
    manualGrouping?: boolean;
    onGroupingChange?: OnChangeFn<GroupingState>;
    enableGrouping?: boolean;
    getGroupedRowModel?: (table: Table<any>) => () => RowModel<any>;
    groupedColumnMode?: false | "reorder" | "remove";
  } & (keyof AggregationFns extends never
    ? {
        aggregationFns?: Record<string, AggregationFn<any>>;
      }
    : {
        aggregationFns: Record<keyof AggregationFns, AggregationFn<any>>;
      });
  type GroupingColumnMode = false | "reorder" | "remove";
  interface GroupingInstance<TData extends RowData> {
    setGrouping: (updater: Updater<GroupingState>) => void;
    resetGrouping: (defaultState?: boolean) => void;
    getPreGroupedRowModel: () => RowModel<TData>;
    getGroupedRowModel: () => RowModel<TData>;
    _getGroupedRowModel?: () => RowModel<TData>;
  }
  const Grouping: TableFeature;
  function orderColumns<TData extends RowData>(
    leafColumns: Column<TData, unknown>[],
    grouping: string[],
    groupedColumnMode?: GroupingColumnMode,
  ): Column<TData, unknown>[];

  type ExpandedStateList = Record<string, boolean>;
  type ExpandedState = true | Record<string, boolean>;
  interface ExpandedTableState {
    expanded: ExpandedState;
  }
  interface ExpandedRow {
    toggleExpanded: (expanded?: boolean) => void;
    getIsExpanded: () => boolean;
    getCanExpand: () => boolean;
    getToggleExpandedHandler: () => () => void;
  }
  interface ExpandedOptions<TData extends RowData> {
    manualExpanding?: boolean;
    onExpandedChange?: OnChangeFn<ExpandedState>;
    autoResetExpanded?: boolean;
    enableExpanding?: boolean;
    getExpandedRowModel?: (table: Table<any>) => () => RowModel<any>;
    getIsRowExpanded?: (row: Row<TData>) => boolean;
    getRowCanExpand?: (row: Row<TData>) => boolean;
    paginateExpandedRows?: boolean;
  }
  interface ExpandedInstance<TData extends RowData> {
    _autoResetExpanded: () => void;
    setExpanded: (updater: Updater<ExpandedState>) => void;
    toggleAllRowsExpanded: (expanded?: boolean) => void;
    resetExpanded: (defaultState?: boolean) => void;
    getCanSomeRowsExpand: () => boolean;
    getToggleAllRowsExpandedHandler: () => (event: unknown) => void;
    getIsSomeRowsExpanded: () => boolean;
    getIsAllRowsExpanded: () => boolean;
    getExpandedDepth: () => number;
    getExpandedRowModel: () => RowModel<TData>;
    _getExpandedRowModel?: () => RowModel<TData>;
    getPreExpandedRowModel: () => RowModel<TData>;
  }
  const Expanding: TableFeature;

  interface ColumnSizingTableState {
    columnSizing: ColumnSizingState;
    columnSizingInfo: ColumnSizingInfoState;
  }
  type ColumnSizingState = Record<string, number>;
  interface ColumnSizingInfoState {
    startOffset: null | number;
    startSize: null | number;
    deltaOffset: null | number;
    deltaPercentage: null | number;
    isResizingColumn: false | string;
    columnSizingStart: [string, number][];
  }
  type ColumnResizeMode = "onChange" | "onEnd";
  interface ColumnSizingOptions {
    enableColumnResizing?: boolean;
    columnResizeMode?: ColumnResizeMode;
    onColumnSizingChange?: OnChangeFn<ColumnSizingState>;
    onColumnSizingInfoChange?: OnChangeFn<ColumnSizingInfoState>;
  }
  interface ColumnSizingDefaultOptions {
    columnResizeMode: ColumnResizeMode;
    onColumnSizingChange: OnChangeFn<ColumnSizingState>;
    onColumnSizingInfoChange: OnChangeFn<ColumnSizingInfoState>;
  }
  interface ColumnSizingInstance {
    setColumnSizing: (updater: Updater<ColumnSizingState>) => void;
    setColumnSizingInfo: (updater: Updater<ColumnSizingInfoState>) => void;
    resetColumnSizing: (defaultState?: boolean) => void;
    resetHeaderSizeInfo: (defaultState?: boolean) => void;
    getTotalSize: () => number;
    getLeftTotalSize: () => number;
    getCenterTotalSize: () => number;
    getRightTotalSize: () => number;
  }
  interface ColumnSizingColumnDef {
    enableResizing?: boolean;
    size?: number;
    minSize?: number;
    maxSize?: number;
  }
  interface ColumnSizingColumn {
    getSize: () => number;
    getStart: (position?: ColumnPinningPosition) => number;
    getCanResize: () => boolean;
    getIsResizing: () => boolean;
    resetSize: () => void;
  }
  interface ColumnSizingHeader {
    getSize: () => number;
    getStart: (position?: ColumnPinningPosition) => number;
    getResizeHandler: () => (event: unknown) => void;
  }
  const defaultColumnSizing: {
    size: number;
    minSize: number;
    maxSize: number;
  };
  const ColumnSizing: TableFeature;
  function passiveEventSupported(): boolean;

  interface PaginationState {
    pageIndex: number;
    pageSize: number;
  }
  interface PaginationTableState {
    pagination: PaginationState;
  }
  interface PaginationInitialTableState {
    pagination?: Partial<PaginationState>;
  }
  interface PaginationOptions {
    pageCount?: number;
    manualPagination?: boolean;
    onPaginationChange?: OnChangeFn<PaginationState>;
    autoResetPageIndex?: boolean;
    getPaginationRowModel?: (table: Table<any>) => () => RowModel<any>;
  }
  interface PaginationDefaultOptions {
    onPaginationChange: OnChangeFn<PaginationState>;
  }
  interface PaginationInstance<TData extends RowData> {
    _autoResetPageIndex: () => void;
    setPagination: (updater: Updater<PaginationState>) => void;
    resetPagination: (defaultState?: boolean) => void;
    setPageIndex: (updater: Updater<number>) => void;
    resetPageIndex: (defaultState?: boolean) => void;
    setPageSize: (updater: Updater<number>) => void;
    resetPageSize: (defaultState?: boolean) => void;
    setPageCount: (updater: Updater<number>) => void;
    getPageOptions: () => number[];
    getCanPreviousPage: () => boolean;
    getCanNextPage: () => boolean;
    previousPage: () => void;
    nextPage: () => void;
    getPrePaginationRowModel: () => RowModel<TData>;
    getPaginationRowModel: () => RowModel<TData>;
    _getPaginationRowModel?: () => RowModel<TData>;
    getPageCount: () => number;
  }
  const Pagination: TableFeature;

  type RowSelectionState = Record<string, boolean>;
  interface RowSelectionTableState {
    rowSelection: RowSelectionState;
  }
  interface RowSelectionOptions<TData extends RowData> {
    enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
    enableMultiRowSelection?: boolean | ((row: Row<TData>) => boolean);
    enableSubRowSelection?: boolean | ((row: Row<TData>) => boolean);
    onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  }
  interface RowSelectionRow {
    getIsSelected: () => boolean;
    getIsSomeSelected: () => boolean;
    getIsAllSubRowsSelected: () => boolean;
    getCanSelect: () => boolean;
    getCanMultiSelect: () => boolean;
    getCanSelectSubRows: () => boolean;
    toggleSelected: (value?: boolean) => void;
    getToggleSelectedHandler: () => (event: unknown) => void;
  }
  interface RowSelectionInstance<TData extends RowData> {
    getToggleAllRowsSelectedHandler: () => (event: unknown) => void;
    getToggleAllPageRowsSelectedHandler: () => (event: unknown) => void;
    setRowSelection: (updater: Updater<RowSelectionState>) => void;
    resetRowSelection: (defaultState?: boolean) => void;
    getIsAllRowsSelected: () => boolean;
    getIsAllPageRowsSelected: () => boolean;
    getIsSomeRowsSelected: () => boolean;
    getIsSomePageRowsSelected: () => boolean;
    toggleAllRowsSelected: (value?: boolean) => void;
    toggleAllPageRowsSelected: (value?: boolean) => void;
    getPreSelectedRowModel: () => RowModel<TData>;
    getSelectedRowModel: () => RowModel<TData>;
    getFilteredSelectedRowModel: () => RowModel<TData>;
    getGroupedSelectedRowModel: () => RowModel<TData>;
  }
  const RowSelection: TableFeature;
  function selectRowsFn<TData extends RowData>(
    table: Table<TData>,
    rowModel: RowModel<TData>,
  ): RowModel<TData>;
  function isRowSelected<TData extends RowData>(
    row: Row<TData>,
    selection: Record<string, boolean>,
  ): boolean;
  function isSubRowSelected<TData extends RowData>(
    row: Row<TData>,
    selection: Record<string, boolean>,
    table: Table<TData>,
  ): boolean | "some" | "all";

  interface CoreRow<TData extends RowData> {
    id: string;
    index: number;
    original: TData;
    depth: number;
    _valuesCache: Record<string, unknown>;
    getValue: <TValue>(columnId: string) => TValue;
    renderValue: <TValue>(columnId: string) => TValue;
    subRows: Row<TData>[];
    getLeafRows: () => Row<TData>[];
    originalSubRows?: TData[];
    getAllCells: () => Cell<TData, unknown>[];
    _getAllCellsByColumnId: () => Record<string, Cell<TData, unknown>>;
  }
  const createRow: <TData extends unknown>(
    table: Table<TData>,
    id: string,
    original: TData,
    rowIndex: number,
    depth: number,
    subRows?: Row<TData>[] | undefined,
  ) => Row<TData>;

  interface CellContext<TData extends RowData, TValue> {
    table: Table<TData>;
    column: Column<TData, TValue>;
    row: Row<TData>;
    cell: Cell<TData, TValue>;
    getValue: Getter<TValue>;
    renderValue: Getter<TValue | null>;
  }
  interface CoreCell<TData extends RowData, TValue> {
    id: string;
    getValue: CellContext<TData, TValue>["getValue"];
    renderValue: CellContext<TData, TValue>["renderValue"];
    row: Row<TData>;
    column: Column<TData, TValue>;
    getContext: () => CellContext<TData, TValue>;
  }
  function createCell<TData extends RowData, TValue>(
    table: Table<TData>,
    row: Row<TData>,
    column: Column<TData, TValue>,
    columnId: string,
  ): Cell<TData, TValue>;

  interface CoreColumn<TData extends RowData, TValue> {
    id: string;
    depth: number;
    accessorFn?: AccessorFn<TData, TValue>;
    columnDef: ColumnDef<TData, TValue>;
    columns: Column<TData, TValue>[];
    parent?: Column<TData, TValue>;
    getFlatColumns: () => Column<TData, TValue>[];
    getLeafColumns: () => Column<TData, TValue>[];
  }
  function createColumn<TData extends RowData, TValue>(
    table: Table<TData>,
    columnDef: ColumnDef<TData, TValue>,
    depth: number,
    parent?: Column<TData, TValue>,
  ): Column<TData, TValue>;

  interface TableMeta<TData extends RowData> {}
  interface ColumnMeta<TData extends RowData, TValue> {}
  interface FilterMeta {}
  interface FilterFns {}
  interface SortingFns {}
  interface AggregationFns {}
  type Updater<T> = T | ((old: T) => T);
  type OnChangeFn<T> = (updaterOrValue: Updater<T>) => void;
  type RowData = unknown | object | any[];
  type AnyRender = (Comp: any, props: any) => any;
  type Table<TData extends RowData> = CoreInstance<TData> &
    HeadersInstance<TData> &
    VisibilityInstance<TData> &
    ColumnOrderInstance<TData> &
    ColumnPinningInstance<TData> &
    FiltersInstance<TData> &
    SortingInstance<TData> &
    GroupingInstance<TData> &
    ColumnSizingInstance &
    ExpandedInstance<TData> &
    PaginationInstance<TData> &
    RowSelectionInstance<TData>;
  type TableOptionsResolved<TData extends RowData> = CoreOptions<TData> &
    VisibilityOptions &
    ColumnOrderOptions &
    ColumnPinningOptions &
    FiltersOptions<TData> &
    SortingOptions<TData> &
    GroupingOptions &
    ExpandedOptions<TData> &
    ColumnSizingOptions &
    PaginationOptions &
    RowSelectionOptions<TData>;
  type TableOptions<TData extends RowData> = PartialKeys<
    TableOptionsResolved<TData>,
    "state" | "onStateChange" | "renderFallbackValue"
  >;
  type TableState = CoreTableState &
    VisibilityTableState &
    ColumnOrderTableState &
    ColumnPinningTableState &
    FiltersTableState &
    SortingTableState &
    ExpandedTableState &
    GroupingTableState &
    ColumnSizingTableState &
    PaginationTableState &
    RowSelectionTableState;
  type InitialTableState = Partial<
    CoreTableState &
      VisibilityTableState &
      ColumnOrderTableState &
      ColumnPinningTableState &
      FiltersTableState &
      SortingTableState &
      ExpandedTableState &
      GroupingTableState &
      ColumnSizingTableState &
      PaginationInitialTableState &
      RowSelectionTableState
  >;
  type Row<TData extends RowData> = CoreRow<TData> &
    VisibilityRow<TData> &
    ColumnPinningRow<TData> &
    FiltersRow<TData> &
    GroupingRow &
    RowSelectionRow &
    ExpandedRow;
  interface RowModel<TData extends RowData> {
    rows: Row<TData>[];
    flatRows: Row<TData>[];
    rowsById: Record<string, Row<TData>>;
  }
  type AccessorFn<TData extends RowData, TValue = unknown> = (
    originalRow: TData,
    index: number,
  ) => TValue;
  type ColumnDefTemplate<TProps extends object> =
    | string
    | ((props: TProps) => any);
  type StringOrTemplateHeader<TData, TValue> =
    | string
    | ColumnDefTemplate<HeaderContext<TData, TValue>>;
  interface StringHeaderIdentifier {
    header: string;
    id?: string;
  }
  interface IdIdentifier<TData extends RowData, TValue> {
    id: string;
    header?: StringOrTemplateHeader<TData, TValue>;
  }
  type ColumnIdentifiers<TData extends RowData, TValue> =
    | IdIdentifier<TData, TValue>
    | StringHeaderIdentifier;
  type ColumnDefBase<TData extends RowData, TValue = unknown> = {
    footer?: ColumnDefTemplate<HeaderContext<TData, TValue>>;
    cell?: ColumnDefTemplate<CellContext<TData, TValue>>;
    meta?: ColumnMeta<TData, TValue>;
  } & VisibilityColumnDef &
    ColumnPinningColumnDef &
    FiltersColumnDef<TData> &
    SortingColumnDef<TData> &
    GroupingColumnDef<TData, TValue> &
    ColumnSizingColumnDef;
  type IdentifiedColumnDef<
    TData extends RowData,
    TValue = unknown,
  > = ColumnDefBase<TData, TValue> & {
    id?: string;
    header?: StringOrTemplateHeader<TData, TValue>;
  };
  type DisplayColumnDef<
    TData extends RowData,
    TValue = unknown,
  > = ColumnDefBase<TData, TValue> & ColumnIdentifiers<TData, TValue>;
  type GroupColumnDef<TData extends RowData, TValue = unknown> = ColumnDefBase<
    TData,
    TValue
  > &
    ColumnIdentifiers<TData, TValue> & {
      columns?: ColumnDef<TData, any>[];
    };
  type AccessorFnColumnDef<
    TData extends RowData,
    TValue = unknown,
  > = ColumnDefBase<TData, TValue> &
    ColumnIdentifiers<TData, TValue> & {
      accessorFn: AccessorFn<TData, TValue>;
    };
  type AccessorKeyColumnDef<TData extends RowData, TValue = unknown> = {
    id?: string;
  } & Partial<ColumnIdentifiers<TData, TValue>> &
    ColumnDefBase<TData, TValue> & {
      accessorKey: string | keyof TData;
    };
  type AccessorColumnDef<TData extends RowData, TValue = unknown> =
    | AccessorKeyColumnDef<TData, TValue>
    | AccessorFnColumnDef<TData, TValue>;
  type ColumnDef<TData extends RowData, TValue = unknown> =
    | DisplayColumnDef<TData, TValue>
    | GroupColumnDef<TData, TValue>
    | AccessorColumnDef<TData, TValue>;
  type ColumnDefResolved<TData extends RowData, TValue = unknown> = Partial<
    UnionToIntersection<ColumnDef<TData, TValue>>
  > & {
    accessorKey?: string;
  };
  type Column<TData extends RowData, TValue = unknown> = CoreColumn<
    TData,
    TValue
  > &
    VisibilityColumn &
    ColumnPinningColumn &
    FiltersColumn<TData> &
    SortingColumn<TData> &
    GroupingColumn<TData> &
    ColumnSizingColumn;
  type Cell<TData extends RowData, TValue> = CoreCell<TData, TValue> &
    GroupingCell;
  type Header<TData extends RowData, TValue> = CoreHeader<TData, TValue> &
    ColumnSizingHeader;
  type HeaderGroup<TData extends RowData> = CoreHeaderGroup<TData>;

  type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
  type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
  type Overwrite<
    T,
    U extends {
      [TKey in keyof T]?: any;
    },
  > = Omit<T, keyof U> & U;
  type UnionToIntersection<T> = (
    T extends any ? (x: T) => any : never
  ) extends (x: infer R) => any
    ? R
    : never;
  type IsAny<T, Y, N> = 1 extends 0 & T ? Y : N;
  type IsKnown<T, Y, N> = unknown extends T ? N : Y;
  type ComputeRange<
    N extends number,
    Result extends Array<unknown> = [],
  > = Result["length"] extends N
    ? Result
    : ComputeRange<N, [...Result, Result["length"]]>;
  type Index40 = ComputeRange<40>[number];
  type IsTuple<T> = T extends readonly any[] & {
    length: infer Length;
  }
    ? Length extends Index40
      ? T
      : never
    : never;
  type AllowedIndexes<
    Tuple extends ReadonlyArray<any>,
    Keys extends number = never,
  > = Tuple extends readonly []
    ? Keys
    : Tuple extends readonly [infer _, ...infer Tail]
    ? AllowedIndexes<Tail, Keys | Tail["length"]>
    : Keys;
  type DeepKeys<T> = unknown extends T
    ? keyof T
    : object extends T
    ? string
    : T extends readonly any[] & IsTuple<T>
    ? AllowedIndexes<T> | DeepKeysPrefix<T, AllowedIndexes<T>>
    : T extends any[]
    ? never & "Dynamic length array indexing is not supported"
    : T extends Date
    ? never
    : T extends object
    ? (keyof T & string) | DeepKeysPrefix<T, keyof T>
    : never;
  // type DeepKeysPrefix<T, TPrefix> = TPrefix extends keyof T & (number | string) ? `${TPrefix}.${DeepKeys<T[TPrefix]> & string}` : never;
  type DeepKeysPrefix<T, TPrefix> = unknown;
  // type DeepValue<T, TProp> = T extends Record<string | number, any> ? TProp extends `${infer TBranch}.${infer TDeepProp}` ? DeepValue<T[TBranch], TDeepProp> : T[TProp & string] : never;
  type DeepValue<T, TProp> = unknown;
  type NoInfer<T> = [T][T extends any ? 0 : never];
  type Getter<TValue> = <TTValue = TValue>() => NoInfer<TTValue>;
  function functionalUpdate<T>(updater: Updater<T>, input: T): T;
  function noop(): void;
  function makeStateUpdater<K extends keyof TableState>(
    key: K,
    instance: unknown,
  ): (updater: Updater<TableState[K]>) => void;
  type AnyFunction = (...args: any) => any;
  function isFunction<T extends AnyFunction>(d: any): d is T;
  function flattenBy<TNode>(
    arr: TNode[],
    getChildren: (item: TNode) => TNode[],
  ): TNode[];
  function memo<TDeps extends readonly any[], TResult>(
    getDeps: () => [...TDeps],
    fn: (...args: NoInfer<[...TDeps]>) => TResult,
    opts: {
      key: any;
      debug?: () => any;
      onChange?: (result: TResult) => void;
    },
  ): () => TResult;

  interface TableFeature {
    getDefaultOptions?: (table: any) => any;
    getInitialState?: (initialState?: InitialTableState) => any;
    createTable?: (table: any) => any;
    getDefaultColumnDef?: () => any;
    createColumn?: (column: any, table: any) => any;
    createHeader?: (column: any, table: any) => any;
    createCell?: (cell: any, column: any, row: any, table: any) => any;
    createRow?: (row: any, table: any) => any;
  }
  interface CoreTableState {}
  interface CoreOptions<TData extends RowData> {
    data: TData[];
    state: Partial<TableState>;
    onStateChange: (updater: Updater<TableState>) => void;
    debugAll?: boolean;
    debugTable?: boolean;
    debugHeaders?: boolean;
    debugColumns?: boolean;
    debugRows?: boolean;
    initialState?: InitialTableState;
    autoResetAll?: boolean;
    mergeOptions?: (
      defaultOptions: TableOptions<TData>,
      options: Partial<TableOptions<TData>>,
    ) => TableOptions<TData>;
    meta?: TableMeta<TData>;
    getCoreRowModel: (table: Table<any>) => () => RowModel<any>;
    getSubRows?: (originalRow: TData, index: number) => undefined | TData[];
    getRowId?: (
      originalRow: TData,
      index: number,
      parent?: Row<TData>,
    ) => string;
    columns: ColumnDef<TData, any>[];
    defaultColumn?: Partial<ColumnDef<TData, unknown>>;
    renderFallbackValue: any;
  }
  interface CoreInstance<TData extends RowData> {
    initialState: TableState;
    reset: () => void;
    options: RequiredKeys<TableOptionsResolved<TData>, "state">;
    setOptions: (newOptions: Updater<TableOptionsResolved<TData>>) => void;
    getState: () => TableState;
    setState: (updater: Updater<TableState>) => void;
    _features: readonly TableFeature[];
    _queue: (cb: () => void) => void;
    _getRowId: (_: TData, index: number, parent?: Row<TData>) => string;
    getCoreRowModel: () => RowModel<TData>;
    _getCoreRowModel?: () => RowModel<TData>;
    getRowModel: () => RowModel<TData>;
    getRow: (id: string) => Row<TData>;
    _getDefaultColumnDef: () => Partial<ColumnDef<TData, unknown>>;
    _getColumnDefs: () => ColumnDef<TData, unknown>[];
    _getAllFlatColumnsById: () => Record<string, Column<TData, unknown>>;
    getAllColumns: () => Column<TData, unknown>[];
    getAllFlatColumns: () => Column<TData, unknown>[];
    getAllLeafColumns: () => Column<TData, unknown>[];
    getColumn: (columnId: string) => Column<TData, unknown>;
  }
  function createTable<TData extends RowData>(
    options: TableOptionsResolved<TData>,
  ): Table<TData>;

  interface ColumnHelper<TData extends RowData> {
    accessor: <
      TAccessor extends AccessorFn<TData> | DeepKeys<TData>,
      TValue extends TAccessor extends AccessorFn<TData, infer TReturn>
        ? TReturn
        : TAccessor extends DeepKeys<TData>
        ? DeepValue<TData, TAccessor>
        : never,
    >(
      accessor: TAccessor,
      column: TAccessor extends AccessorFn<TData>
        ? DisplayColumnDef<TData, TValue>
        : IdentifiedColumnDef<TData, TValue>,
    ) => ColumnDef<TData, TValue>;
    display: (column: DisplayColumnDef<TData>) => ColumnDef<TData, unknown>;
    group: (column: GroupColumnDef<TData>) => ColumnDef<TData, unknown>;
  }
  function createColumnHelper<TData extends RowData>(): ColumnHelper<TData>;

  function getCoreRowModel<TData extends RowData>(): (
    table: Table<TData>,
  ) => () => RowModel<TData>;

  function getFilteredRowModel<TData extends RowData>(): (
    table: Table<TData>,
  ) => () => RowModel<TData>;

  function getFacetedRowModel<TData extends RowData>(): (
    table: Table<TData>,
    columnId: string,
  ) => () => RowModel<TData>;

  function getFacetedUniqueValues<TData extends RowData>(): (
    table: Table<TData>,
    columnId: string,
  ) => () => Map<any, number>;

  function getFacetedMinMaxValues<TData extends RowData>(): (
    table: Table<TData>,
    columnId: string,
  ) => () => undefined | [number, number];

  function getSortedRowModel<TData extends RowData>(): (
    table: Table<TData>,
  ) => () => RowModel<TData>;

  function getGroupedRowModel<TData extends RowData>(): (
    table: Table<TData>,
  ) => () => RowModel<TData>;

  function getExpandedRowModel<TData extends RowData>(): (
    table: Table<TData>,
  ) => () => RowModel<TData>;
  function expandRows<TData extends RowData>(
    rowModel: RowModel<TData>,
  ): {
    rows: Row<TData>[];
    flatRows: Row<TData>[];
    rowsById: Record<string, Row<TData>>;
  };

  function getPaginationRowModel<TData extends RowData>(opts?: {
    initialSync: boolean;
  }): (table: Table<TData>) => () => RowModel<TData>;
}
