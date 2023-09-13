import React, { createContext, useContext, useEffect, useState } from "react";
import { Sorting, SortingDirection } from "../../DataList.types";
import { useDataListContext } from "../DataListContext";

const DataListSortContext = createContext({
  sorting: {
    direction: SortingDirection.None,
    key: "",
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toggleSorting: (_: string) => {
    return;
  },
});

export function useDataListSortContext() {
  return useContext(DataListSortContext);
}

export function DataListSortProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sorting, setSorting] = useState<Sorting>({
    direction: SortingDirection.None,
    key: "",
  });

  const { onSortingChange } = useDataListContext();

  function toggleSorting(sortingKey: string) {
    if (sortingKey === sorting.key) {
      setSorting({
        direction:
          sorting.direction === SortingDirection.Ascending
            ? SortingDirection.Descending
            : SortingDirection.Ascending,
        key: sortingKey,
      });
    } else {
      setSorting({ direction: SortingDirection.Ascending, key: sortingKey });
    }
  }

  useEffect(() => {
    if (sorting.key) {
      onSortingChange?.(sorting);
    }
  }, [sorting]);

  return (
    <DataListSortContext.Provider value={{ sorting, toggleSorting }}>
      {children}{" "}
    </DataListSortContext.Provider>
  );
}
