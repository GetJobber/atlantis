import { createContext, useContext } from "react";
import {
  DataListLayoutActionsContextProps,
  DataListObject,
} from "@jobber/components/DataList/DataList.types";

export const DataListLayoutActionsContext = createContext<
  DataListLayoutActionsContextProps<DataListObject>
>({ activeItem: undefined });

export function useDataListLayoutActionsContext<T extends DataListObject>() {
  return useContext(
    DataListLayoutActionsContext,
  ) as DataListLayoutActionsContextProps<T>;
}
