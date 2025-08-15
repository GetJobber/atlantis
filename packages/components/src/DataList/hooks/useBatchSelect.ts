import { useDataListContext } from "../context/DataListContext";
import type { DataListSelectedType } from "../DataList.types";

export function useBatchSelect() {
  const { selected, onSelect, onSelectAll } = useDataListContext();
  const isArray = Array.isArray(selected);
  const selectedIDs = getIDs(selected);
  const isSelectAll = !isArray;

  return {
    canSelect: Boolean(selected && onSelect),
    canSelectAll: Boolean(onSelect && onSelectAll),
    hasAtLeastOneSelected: isSelectAll || selectedIDs.length > 0,
    isSelectAll,
    isSelectSome: isArray,
    selectedCount: getSelectedCount(selected),
    selectedIDs,
    selected,
    onSelect,
    onSelectAll,
  };
}

function getIDs(selected?: DataListSelectedType) {
  if (Array.isArray(selected)) return selected;
  if (selected === undefined) return [];

  return selected.unselected;
}

function getSelectedCount(selected?: DataListSelectedType) {
  if (Array.isArray(selected)) return selected.length;
  if (selected === undefined) return 0;

  return selected.totalCount - selected.unselected.length;
}
