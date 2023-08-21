import React from "react";
import {
  Breakpoints,
  DataListItemType,
  DataListObject,
} from "../../DataList.types";

export interface DataListLayoutProps<T extends DataListObject> {
  children: (item: DataListItemType<T[]>) => JSX.Element;

  /**
   * The breakpoint at which the layout should be displayed. It will be rendered until a layout with a larger breakpoint is found.
   * @default "xs"
   */
  readonly size?: Breakpoints;

  /**
   * Determines if a header is shown for the layout
   * @default true
   */
  readonly showHeader?: boolean;
}

export function DataListLayout<T extends DataListObject>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: DataListLayoutProps<T>,
) {
  return <></>;
}
