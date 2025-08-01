import React, { createContext, useContext } from "react";
import { Table } from "@tanstack/react-table";

export interface DataTableContextProps<T> {
  readonly table: Table<T>;
}

export const DataTableContext =
  createContext<DataTableContextProps<unknown> | null>(null);

export function useDataTableContext<T>(): DataTableContextProps<T> {
  return useContext(DataTableContext) as DataTableContextProps<T>;
}

export function DataTableProvider<T>({
  children,
  table,
}: {
  readonly children: React.ReactNode;
  readonly table: Table<T>;
}) {
  return (
    <DataTableContext.Provider
      value={{ table } as DataTableContextProps<unknown>}
    >
      {children}
    </DataTableContext.Provider>
  );
}
