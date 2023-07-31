/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext } from "react";
import { DataType } from "./data";

export interface ThiccListContextProps {
  readonly selectedItems: number[];
  readonly setSelectedItems: (selectedItems: number[]) => void;
  readonly addOrRemoveSelectedItem: (
    item: DataType,
    shouldClear?: boolean,
  ) => void;
}

export const defaultValues: ThiccListContextProps = {
  selectedItems: [],
  setSelectedItems: () => undefined,
  addOrRemoveSelectedItem: () => undefined,
};

export const ThiccListContext = createContext(defaultValues);

export function useThiccListContext(): ThiccListContextProps {
  return useContext(ThiccListContext);
}
