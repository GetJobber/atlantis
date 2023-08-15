import { ReactElement, ReactNode } from "react";

export type DataListItemType<T extends DataListObject[]> = Record<
  keyof T[number],
  ReactElement
>;

export type DataListObject = Record<string, ReactNode | Date>;

export interface DataListProps<T extends DataListObject> {
  readonly data: T[];

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
}
