import { createContext, useContext } from "react";
import { DataListContextProps, DataListObject } from "../../DataList.types";

export const defaultValues = {
  title: "",
  data: [],
  headers: {},
  children: [],
  onSelect: undefined,
  selected: [],
};

export const DataListContext =
  createContext<DataListContextProps<DataListObject>>(defaultValues);

export function useDataListContext() {
  return useContext(DataListContext);
}
