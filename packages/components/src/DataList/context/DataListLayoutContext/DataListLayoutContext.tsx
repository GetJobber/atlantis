import { createContext, useContext } from "react";
import { DataListLayoutContextProps } from "@jobber/components/DataList/DataList.types";

export const defaultValues: DataListLayoutContextProps = {
  isInLayoutProvider: false,
  hasInLayoutActions: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setHasInLayoutActions: () => {},
};

export const DataListLayoutContext = createContext(defaultValues);

export function useDataListLayoutContext() {
  return useContext(DataListLayoutContext);
}
