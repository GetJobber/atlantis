import React, { createContext, useContext } from "react";
import { DataListContextProps, DataListObject } from "../../DataList.types";

export const defaultValues: DataListContextProps<DataListObject> = {
  title: "",
  data: [],
  headers: {},
  children: [],
  selected: [],
  layoutBreakpoints: [],
  layouts: {
    xs: children => <>{children}</>,
    sm: children => <>{children}</>,
    md: children => <>{children}</>,
    lg: children => <>{children}</>,
    xl: children => <>{children}</>,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  registerLayout: () => {},
};

export const DataListContext =
  createContext<DataListContextProps<DataListObject>>(defaultValues);

export function useDataListContext<T extends DataListObject>() {
  return useContext(DataListContext) as DataListContextProps<T>;
}
