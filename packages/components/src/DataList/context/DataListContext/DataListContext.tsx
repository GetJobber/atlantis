import { createContext, useContext } from "react";
import { DataListContextProps, DataListObject } from "../../DataList.types";

export const defaultValues: DataListContextProps<DataListObject> = {
  title: "",
  data: [],
  headers: {},
  children: [],
  selected: [],
  hasInLayoutActions: false,
  setHasInLayoutActions: () => undefined,
};

export const DataListContext =
  createContext<DataListContextProps<DataListObject>>(defaultValues);

export function useDataListContext() {
  return useContext(DataListContext);
}
