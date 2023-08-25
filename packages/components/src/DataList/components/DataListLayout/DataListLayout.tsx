import React from "react";
import {
  Breakpoints,
  DataListItemType,
  DataListObject,
} from "../../DataList.types";

export interface DataListLayoutProps<T extends DataListObject> {
  readonly children: (item: DataListItemType<T[]>) => JSX.Element;

  /**
   * The breakpoint at which the layout should be displayed. It will be rendered until a layout with a larger breakpoint is found.
   * @default "xs"
   */
  readonly size?: Breakpoints;
}

export function DataListLayout<T extends DataListObject>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: DataListLayoutProps<T>,
) {
  return <></>;
}
