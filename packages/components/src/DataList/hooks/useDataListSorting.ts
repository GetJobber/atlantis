import { useEffect, useState } from "react";
import { Sorting, SortingDirection } from "../DataList.types";
import { useDataListContext } from "../context/DataListContext";

export function useDataListSorting(): {
  sorting: Sorting;
  setSorting: React.Dispatch<React.SetStateAction<Sorting>>;
  toggleSorting: (sortingKey: string) => void;
} {
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

  return { sorting, setSorting, toggleSorting };
}
