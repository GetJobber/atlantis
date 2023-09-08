import { ReactElement, ReactNode } from "react";
import { Breakpoints } from "./DataList.const";
import { ButtonProps } from "../Button";

export { Breakpoints } from "./DataList.const";

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

export interface DataListProps<T extends DataListObject> {
  readonly data: T[];
  readonly headers: DataListHeader<T>;

  /**
   * Shows the loading state of the DataList.
   *
   * @default false
   */
  readonly loading?: boolean;

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
   * This renders an "N result" text with the DataList
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
}

export interface DataListSearchProps {
  readonly placeholder?: string;
  readonly onSearch: (search: string) => void;
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
}

export interface DataListContextProps<T extends DataListObject>
  extends DataListProps<T> {
  readonly filterComponent?: ReactElement<DataListFiltersProps>;
  readonly searchComponent?: ReactElement<DataListSearchProps>;
  readonly emptyStateComponents?: ReactElement<DataListEmptyStateProps>[];
}
