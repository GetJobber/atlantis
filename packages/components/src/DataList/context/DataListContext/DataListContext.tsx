import { createContext, useContext } from "react";
import { DataListObject, DataListProps } from "../../DataList.types";

export const DataListContext = createContext<DataListProps<DataListObject>>({
  data: [],
  headers: {},
  children: [],
});

export function useDataListContext() {
  return useContext(DataListContext);
}
