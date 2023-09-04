import { createContext, useContext } from "react";
import { DataListObject, DataListProps } from "../../DataList.types";

export const defaultValues = {
  title: "",
  data: [],
  headers: {},
  children: [],
};

export const DataListContext =
  createContext<DataListProps<DataListObject>>(defaultValues);

export function useDataListContext() {
  return useContext(DataListContext);
}
