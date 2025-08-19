import type { ReactElement, ReactNode } from "react";
import type { IconNames } from "@jobber/design";
import type { XOR } from "ts-xor";
import { type Breakpoints } from "./DataList.const";
import { type ButtonProps } from "../Button";

export { type Breakpoints } from "./DataList.const";

export type DataListItemType<T extends DataListObject[]> = Record<
  keyof T[number],
  ReactElement
>;

export type DataListItemTypeFromHeader<
  TData extends DataListObject,
  THeader extends DataListHeader<TData>,
> = Record<keyof THeader, ReactElement>;

export interface DataListObject {
  /**
   * The ID of the data.
   *
   * This is used as a key when looping through the data to prevent accidental
   * rerender when the order of data changes.
   */
  readonly id: string | number;

  /**
   * Styles the string as an emphasized text that differs from other keys.
   */
  readonly label?: string | ReactElement;

  /**
   * Creates a styled list of tags that overflows and is truncated with a +N.
   */
  readonly tags?: string[];

  /**
   * Support any key. The keys in this object are used as way to determine the
   * keys you can use on the DataList header, layout, etc.
   */
  readonly [key: string]: ReactNode | Date;
}

export type DataListHeader<T extends DataListObject> = {
  readonly [K in keyof T]?: string;
};

export interface DataListSorting extends Partial<SortableOptions> {
  readonly key: string;
}

export interface SortableOptions {
  readonly id: string;
  readonly label: string;
  readonly order: "asc" | "desc";
}

export interface DataListSortable {
  /**
   * The key of the sortable column.
   */
  readonly key: string;

  /**
   * The type of sorting on the column. Toggle will show the sorting arrows
   * on the column header. Dropdown will show a menu with the sorting
   * options.
   */
  readonly sortType: "toggle" | "dropdown";

  /**
   * The sorting options, containing id, label and order.
   */
  readonly options: SortableOptions[];
}

export interface DataListProps<T extends DataListObject> {
  /**
   * The data to render in the DataList.
   */
  readonly data: T[];

  /**
   * The header of the DataList. The object keys are determined by the
   * keys in the data.
   */
  readonly headers: DataListHeader<T>;

  /**
   * Set the loading state of the DataList. There are a few guidelines on when to use what.
   *
   * - `"initial"` - loading the first set of data
   * - `"filtering"` - loading after a filter is applied
   * - `"loadingMore"` - loading more data after the user scrolls to the bottom
   */
  readonly loadingState?: "initial" | "filtering" | "loadingMore" | "none";

  /**
   * Adjusts the DataList to show the UX when it is filtered.
   */
  readonly filtered?: boolean;

  /**
   * The title of the DataList.
   */
  readonly title?: string;

  /**
   * Total number of items in the DataList.
   *
   * This renders an "N results" text with the DataList
   * that helps users know how many items they have
   * in the list
   */
  readonly totalCount?: number | null;

  /**
   * Determine if the header is visible at a given breakpoint. If one isn't provided,
   * it will use the value from the next smallest breakpoint that has a value.
   * @default { xs: true, sm: true, md: true, lg: true, xl: true }
   */
  readonly headerVisibility?: { [Breakpoint in Breakpoints]?: boolean };

  readonly children: ReactElement | ReactElement[];

  /**
   * The callback function when the user scrolls to the bottom of the list.
   */
  readonly onLoadMore?: () => void;

  /**
   * `sortable`: List of keys that are sortable.
   * `state`: The state of the sorting.
   * `onSort`: The callback function when the user sorting a column.
   */
  readonly sorting?: {
    readonly sortable: DataListSortable[];
    readonly state: DataListSorting | undefined;
    readonly onSort: (sorting?: DataListSorting) => void;
  };

  /**
   * The list of Selected Item ids
   */
  readonly selected?: DataListSelectedType<T["id"]>;

  /**
   * Callback when an item checkbox is clicked.
   */
  readonly onSelect?: (selected: DataListSelectedType<T["id"]>) => void;

  /**
   * Callback when the select all checkbox is clicked.
   */
  readonly onSelectAll?: (selected: DataListSelectedType<T["id"]>) => void;
}

/**
 * Select all items in the DataList except the ones in the unselected array.
 *
 * This is used in scenarios where we need to select all items in the DataList
 * but couldn't query all the ID's. So instead of feeding all the ID's to the
 * DataList, we set all checkboxes to be checked except for the items that are
 * in the unselected array.
 */
export interface DataListSelectedAllType<
  T extends DataListObject = DataListObject,
> {
  /**
   * The total number of selected items in the DataList.
   */
  readonly totalCount: number;

  /**
   * Track the ID's of the unchecked items.
   */
  readonly unselected: T["id"][];
}

export type DataListSelectedType<
  T extends string | number = DataListObject["id"],
> = T[] | DataListSelectedAllType;

export type LayoutRenderer<T extends DataListObject> = (
  item: DataListItemType<T[]>,
) => JSX.Element;

export interface DataListLayoutProps<T extends DataListObject> {
  readonly children: LayoutRenderer<T>;

  /**
   * The breakpoint at which the layout should be displayed. It will be rendered until a layout with a larger breakpoint is found.
   * @default "xs"
   */
  readonly size?: Breakpoints;
}

export interface DataListSearchProps {
  /**
   * The placeholder text for the search input. This either uses the title prop
   * prepended by "Search" or just falls back to "Search".
   */
  readonly placeholder?: string;

  /**
   * The initial value of the search input.
   *
   * Updating this prop after the component has mounted will rerender the
   * component with the new value. Only update the value of this when you
   * absolutely have to.
   */
  readonly initialValue?: string;

  /**
   * The controlled value of the search input.
   *
   * Supply this field if you want to take control over the search input's
   * value. You'll need to use `onSearch` to handle updating your state with
   * the latest value.
   */
  readonly value?: string;

  readonly onSearch: (value: string) => void;
}

export interface DataListFiltersProps {
  readonly children: ReactElement | ReactElement[];
}

export interface DataListEmptyStateProps {
  /**
   * The message that shows when the DataList is empty.
   */
  readonly message: string;

  /**
   * The action that shows when the DataList is empty.
   *
   * This only accepts a Button component. Adding a non-Button component will
   * throw an error.
   */
  readonly action?: ReactElement<ButtonProps>;

  /**
   * Determine the type of empty state to show.
   *
   * By default, it will show the "empty" state when there is no data. If you
   * want to show the "filtered" type, you need to set the `filtered` prop
   * to the DataList component.
   */
  readonly type?: "filtered" | "empty";

  /**
   * Custom render function for the empty state.
   *
   * If provided, this function will be used to render the empty state instead
   * of the default rendering logic.
   */
  readonly customRender?: (
    emptyState: Omit<DataListEmptyStateProps, "customRender">,
  ) => ReactNode;
}

export interface DataListContextProps<T extends DataListObject>
  extends DataListProps<T> {
  readonly filterComponent?: ReactElement<DataListFiltersProps>;
  readonly searchComponent?: ReactElement<DataListSearchProps>;
  readonly emptyStateComponents?: ReactElement<DataListEmptyStateProps>[];
  readonly layoutComponents?: ReactElement<DataListLayoutProps<T>>[];
  readonly itemActionComponent?: ReactElement<DataListItemActionsProps<T>>;
  readonly bulkActionsComponent?: ReactElement<DataListItemActionsProps<T>>;

  readonly layoutBreakpoints: Breakpoints[];

  readonly layouts: {
    readonly [Breakpoint in Breakpoints]?: LayoutRenderer<T>;
  };
  readonly registerLayout: (
    size: Breakpoints,
    layout: LayoutRenderer<T>,
  ) => void;
}

export interface DataListLayoutContextProps {
  readonly isInLayoutProvider: boolean;

  /**
   * Determine if the consumer of the DataList manually added an action to the
   * layout. This is used to determine if the DataList should render the
   * action column.
   */
  readonly hasInLayoutActions: boolean;
  readonly setHasInLayoutActions: (state: boolean) => void;
}

export interface DataListLayoutActionsContextProps<T extends DataListObject> {
  readonly activeItem?: T;
}

type Fragment<T> = T | T[];

interface BaseDataListItemActionsProps<T extends DataListObject> {
  /**
   * The actions to render for each item in the DataList. This only accepts the
   * DataList.Action component.
   */
  readonly children?: Fragment<ReactElement<DataListActionProps<T>>>;

  /**
   * Callback when an item is clicked.
   */
  readonly onClick?: (item: T, event?: React.MouseEvent<HTMLElement>) => void;

  /**
   * Disable the custom context menu. This allows the browser's native context menu to be shown.
   * @default false
   */
  readonly disableContextMenu?: boolean;
}

export interface DataListBulkActionsProps {
  /**
   * The actions to render on the top of the DataList to make actions to multiple items.
   * This only accepts the DataList.BatchAction component.
   */
  readonly children?: Fragment<ReactElement<DataListBulkActionProps>>;
}

interface DataListItemActionsPropsWithURL<T extends DataListObject>
  extends BaseDataListItemActionsProps<T> {
  /**
   * If a normal page navigation is needed, use this prop to change the element
   * to an `a` tag with an `href`.
   */
  readonly url?: string | ((item: T) => string);
}

interface DataListItemActionsPropsWithTo<T extends DataListObject>
  extends BaseDataListItemActionsProps<T> {
  /**
   * If a React Navigation is needed, use this prop to use the `Link` component
   * that comes with React Router.
   */
  readonly to?: string | ((item: T) => string);
}

export type DataListItemActionsProps<T extends DataListObject> = XOR<
  DataListItemActionsPropsWithURL<T>,
  DataListItemActionsPropsWithTo<T>
>;

export interface DataListActionProps<T extends DataListObject> {
  /**
   * The label of the action
   */
  readonly label: string | ((item: T) => string);

  /**
   * The icon beside the label
   */
  readonly icon?: IconNames;

  /**
   * Adjust the styling of an action label and icon to be more destructive.
   */
  readonly destructive?: boolean;

  /**
   * Determine if the action is visible for a given item.
   */
  readonly visible?: (item: T) => boolean;

  /**
   * The callback function when the action is clicked.
   */
  readonly onClick?: (data: T) => void;

  /**
   * The URL to navigate to when the action is clicked.
   */
  readonly actionUrl?: string;

  /**
   * Determine if the action is always visible. It is not recommended to set this to true on more then one action.
   */
  readonly alwaysVisible?: boolean;
}

export interface DataListActionsProps<T extends DataListObject> {
  /**
   * The actions to render for each item in the DataList. This only accepts the
   * DataList.Action component.
   */
  readonly children?: Fragment<ReactElement<DataListActionProps<T>>>;

  /**
   * The number of items to expose before the "More" button is shown.
   * @default 2
   */
  readonly itemsToExpose?: number;
}

export interface DataListBulkActionProps
  extends Omit<DataListActionProps<DataListObject>, "visible"> {
  /**
   * The callback function when the action is clicked.
   */
  readonly onClick?: () => void;
}
