import { createContext, useContext } from "react";
import noop from "lodash/noop";
import { DataListContextProps, DataListObject } from "../../DataList.types";

export const defaultValues: DataListContextProps<DataListObject> = {
  title: "",
  data: [],
  headers: {},
  children: [],
  selected: [],
  hasInLayoutActions: false,
  setHasInLayoutActions: noop,
};

export const DataListContext =
  createContext<DataListContextProps<DataListObject>>(defaultValues);

export function useDataListContext() {
  return useContext(DataListContext);
}
