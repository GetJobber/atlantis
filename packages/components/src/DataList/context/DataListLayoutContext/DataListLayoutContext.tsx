import noop from "lodash/noop";
import { createContext, useContext } from "react";
import {
  DataListLayoutContextProps,
  DataListObject,
} from "../../DataList.types";

export const defaultValues: DataListLayoutContextProps<DataListObject> = {
  hasInLayoutActions: false,
  setHasInLayoutActions: noop,
};

export const DataListLayoutContext =
  createContext<DataListLayoutContextProps<DataListObject>>(defaultValues);

export function useDataListLayoutContext() {
  return useContext(DataListLayoutContext);
}
