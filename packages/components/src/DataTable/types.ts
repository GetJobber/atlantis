import { PaginationState, SortingState } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

interface ManualPagination {
  /**
   * When manually controlled represents the current pagination state of the table.
   *
   * @type {PaginationState}
   */
  state: PaginationState;

  /**
   * When manually controlling pagination, you should supply a total pageCount value to the table if you know it.
   * If you do not know how many pages there are, you can set this to -1. (Or should we error?)
   *
   * @type {number}
   */
  pageCount: number;

  /**
   * If this function is provided, it will be called when the pagination state changes and you will be expected
   * to manage the state yourself. You can pass the managed state back to the table via the state option.
   */
  onPaginationChange: Dispatch<SetStateAction<PaginationState>>;

  /**
   * Enables manual pagination. If this option is set to true,
   * the table will not automatically paginate and instead will expect you
   * to manually paginate the rows before passing them to the table.
   *
   * @type {boolean}
   */
  manualPagination: true;
  /**
   * The options to control the pagination
   *
   * @type {number[]}
   * @memberof Pagination
   */
  itemsPerPage?: number[];
  /**
   * When manual pagination is enable the total numbers of
   * records in the table should be provided.
   *
   * @type {number}
   * @memberof Pagination
   */
  totalItems: number;
}

interface DefaultPagination {
  manualPagination: false;
}

export type Pagination = DefaultPagination | ManualPagination;

export interface ManualSorting {
  /**
   * Represents the current sorting state of the table.
   *
   * @type {SortingState}
   */
  state: SortingState;

  /**
   * Enables manual sorting for the table.
   *
   * @type {boolean}
   */
  manualSorting: true;

  /**
   * This overrides the default internal state management,
   * so you will need to persist the state change either fully or partially outside of the table.
   */
  onSortingChange: Dispatch<SetStateAction<SortingState>>;
}

interface DefaultSorting {
  /**
   * Enables manual sorting for the table.
   *
   * @type {boolean}
   */
  manualSorting: false;
}

export type Sorting = DefaultSorting | ManualSorting;
