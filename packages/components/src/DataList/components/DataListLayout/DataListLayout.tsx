import React from "react";
import { DataListItemType, DataListObject } from "../../DataList.types";

export interface DataListLayoutProps<T extends DataListObject> {
  children: (item: DataListItemType<T[]>) => JSX.Element;
}

export function DataListLayout<T extends DataListObject>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: DataListLayoutProps<T>,
) {
  return <></>;
}
