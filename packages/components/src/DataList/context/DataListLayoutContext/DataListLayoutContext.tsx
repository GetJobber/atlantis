import noop from "lodash/noop";
import { createContext, useContext } from "react";
import type { DataListLayoutContextProps } from "@jobber/components/DataList/DataList.types";

export const defaultValues: DataListLayoutContextProps = {
  isInLayoutProvider: false,
  hasInLayoutActions: false,
  setHasInLayoutActions: noop,
};

export const DataListLayoutContext = createContext(defaultValues);

export function useDataListLayoutContext() {
  return useContext(DataListLayoutContext);
}
