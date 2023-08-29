import { ReactElement, ReactNode } from "react";
import { Breakpoints } from "./DataList.const";

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
   * Temporary prop for setting default state for if filters are applied
   *
   * @default false
   */
  readonly filterApplied?: boolean;
  readonly children: ReactElement | ReactElement[];

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
}
