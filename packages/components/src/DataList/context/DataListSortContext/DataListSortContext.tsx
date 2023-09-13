import React, { createContext, useContext, useEffect, useState } from "react";
import { DataListSortContextProps, Sorting } from "../../DataList.types";
import { useDataListContext } from "../DataListContext";

const DataListSortContext = createContext<DataListSortContextProps>({
  sortingState: {
    direction: "none",
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
  const { sorting: sortingProp } = useDataListContext();

  const [sortingState, setSortingState] = useState<Sorting>(
    sortingProp?.initialState || {
      direction: "none",
      key: "",
    },
  );

  function toggleSorting(sortingKey: string) {
    if (sortingKey === sortingState.key) {
      setSortingState({
        direction: sortingState.direction === "asc" ? "desc" : "asc",
        key: sortingKey,
      });
    } else {
      setSortingState({ direction: "asc", key: sortingKey });
    }
  }

  useEffect(() => {
    if (sortingState.key) {
      sortingProp?.onSort?.(sortingState);
    }
  }, [sortingState]);

  return (
    <DataListSortContext.Provider value={{ sortingState, toggleSorting }}>
      {children}{" "}
    </DataListSortContext.Provider>
  );
}
