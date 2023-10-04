import React, { createContext, useContext } from "react";
import noop from "lodash/noop";
import { DataListContextProps, DataListObject } from "../../DataList.types";

export const defaultValues: DataListContextProps<DataListObject> = {
  title: "",
  data: [],
  headers: {},
  children: [],
  selected: [],
  layoutBreakpoints: [],
  registerLayoutBreakpoints: noop,
  layouts: {
    xs: children => <>{children}</>,
    sm: children => <>{children}</>,
    md: children => <>{children}</>,
    lg: children => <>{children}</>,
    xl: children => <>{children}</>,
  },
  registerLayout: noop,
};

export const DataListContext =
  createContext<DataListContextProps<DataListObject>>(defaultValues);

export function useDataListContext<T extends DataListObject>() {
  return useContext(DataListContext) as DataListContextProps<T>;
}
