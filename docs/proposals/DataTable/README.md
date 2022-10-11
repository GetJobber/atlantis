# DataTable

The `DataTable` Component would give the users options for pagination, sorting,
and column visibility by leveraging some sort of API or service.

## Design Patterns

Tables are used to organize tabular information to help users understand and
quickly scan for information.

Some scenarios for Tables include the following:

- Index Pages
- Dashboards

### Sorting

Sorting can be enabled on column headers to improve usability.

The default sorted column should be based on contextual based on user needs.

To indicate the column being sorted, use an up (ascending) or down (descending)
arrow next to the column title. Only 1 column can be sorted at a time. User can
click on a sorted header to reverse the sorting order. Arrow will rotate 180
degrees.

Not all columns will need sorting enabled.

# Column Visibility

Not 100% sure if this is something to be implemented at component level but at
least should be facilitated somehow.

## Usage

```tsx
<DataTable
  data={[
    { name: "Gui", awesome: "yes" },
    { name: "Harry", awesome: "yes" },
    { name: "Chris", awesome: "yes" },
    { name: "Juan", awesome: "yes" },
  ]}
  columns={[
    {
      accessorKey: "name",
      cell: info => <span>{info.getValue()}</span>,
    },
    {
      accessorKey: "awesome",
      cell: info => info.getValue(),
    },
  ]}
/>
```

## Interface and Props

```ts
interface DataTableProps<T> {
  /**
   * The actual data that will be used for the table.
   * Typescript should infer T from typeof data.
   *
   * @type {T[]}
   * @memberof DataTable
   */
  data: T[];
  /**
   * Should follow the @tanstack/react-table ColumnDef.
   * I'm not sure if we need to create an abstraction around this
   * specific type, ColumnDef by itself is already very flexible and powerfull enough
   * to enable us to configure the table any way we like.
   * https://tanstack.com/table/v8/docs/guide/column-defs
   *
   * @type {ColumnDef<T>[]}
   * @memberof DataTable
   */
  columns: ColumnDef<T>[];

  /**
   * Enables pagination, mostly follows:
   * https://tanstack.com/table/v8/docs/api/features/pagination
   *
   * @type {Pagination}
   */
  pagination?: Pagination;

  /**
   * Enables pagination, mostly follows:
   * https://tanstack.com/table/v8/docs/api/features/sorting#table-options
   * @type {Sorting}
   * @memberof DataTable
   */
  sorting?: Sorting;
}

type Pagination = {
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
  onPaginationChange?: (newPaginationState: PaginationState) => void;

  /**
   * Enables manual pagination. If this option is set to true,
   * the table will not automatically paginate and instead will expect you
   * to manually paginate the rows before passing them to the table.
   *
   * @type {boolean}
   */
  manualPagination: boolean;
};

type PaginationState = {
  pageIndex: number;
  pageSize: number;
};

type Sorting = {
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
};

type SortingState = ColumnSort[];

type ColumnSort = {
  id: string;
  desc: boolean;
};
```

## Accessibility
