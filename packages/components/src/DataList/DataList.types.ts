import { ReactElement, ReactNode } from "react";

export type DataListItemType<T extends DataListObject[]> = Record<
  keyof T[number],
  ReactElement
>;

export type DataListItemTypeFromHeader<
  TData extends DataListObject,
  THeader extends DataListHeader<TData>,
> = Record<keyof THeader, ReactElement>;

export interface DataListObject {
  readonly id: string | number;
  readonly [key: string]: ReactNode | Date;
}

export type DataListHeader<T extends DataListObject> = {
  readonly [K in keyof T]?: string;
};

export interface DataListProps<T extends DataListObject> {
  readonly data: T[];
  readonly headers: DataListHeader<T>;

  /**
   * Tell the DataList if the data loading
   * @default false
   */
  readonly loading?: boolean;

  /**
   * Temporary prop for setting default state for if filters are applied
   * @default false
   */
  readonly filterApplied?: boolean;
  readonly children: ReactElement | ReactElement[];

  /**
   * The title of the DataList
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
}
