import React from "react";
import classNames from "classnames";
import { Checkbox } from "@jobber/components/Checkbox";
import { DataListObject } from "@jobber/components/DataList/DataList.types";
import { useBatchSelect } from "@jobber/components/DataList/hooks/useBatchSelect";
import styles from "../../DataList.css";
import { useGetItemActions } from "../../hooks/useGetItemActions";
import { useDataListLayoutContext } from "../../context/DataListLayoutContext";
import { DataListLayoutActionsInternal } from "../DataListLayoutActions/DataListLayoutActions";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface ListItemInternalProps<T extends DataListObject> {
  readonly children: JSX.Element;
  readonly item: T;
}

export function DataListItemInternal<T extends DataListObject>({
  children,
  item,
}: ListItemInternalProps<T>) {
  const {
    canSelect,
    hasAtLeastOneSelected,
    isSelectAll,
    selectedIDs,
    selected,
    onSelect,
  } = useBatchSelect();
  const { hasActions } = useGetItemActions(item);
  const { hasInLayoutActions } = useDataListLayoutContext();
  const isCoarsePointer = useMediaQuery("(any-pointer: coarse)");
  const classesToApply = classNames({
    [styles.selectable]: canSelect,
    [styles.selected]: hasAtLeastOneSelected,
    [styles.hasActions]: isCoarsePointer && !hasInLayoutActions && hasActions,
  });

  return (
    <div className={classesToApply}>
      {children}
      {canSelect && (
        <Checkbox checked={getIsChecked()} onChange={handleChange} />
      )}
      {isCoarsePointer && !hasInLayoutActions && hasActions && (
        <DataListLayoutActionsInternal isManagedByDataList={true} />
      )}
    </div>
  );

  function getIsChecked(): boolean | undefined {
    const isItemInSelectedIDs = selectedIDs.includes(item.id);

    // If we're in a "select all" state, the selectedID's becomes a list of
    // unchecked ID's.
    if (isSelectAll) return !isItemInSelectedIDs;

    // Otherwise, we're in a "select some" state, so we can just check if the
    // item is in the selectedIDs list.
    return isItemInSelectedIDs;
  }

  function handleChange() {
    if (isSelectAll) return handleSelectAllChange();

    return handleSelectSomeChange();
  }

  function handleSelectAllChange() {
    if (!selected || Array.isArray(selected)) return;

    if (selectedIDs?.includes(item.id)) {
      onSelect?.({
        ...selected,
        unselected: selectedIDs?.filter(id => id !== item.id),
      });
    } else if (selectedIDs) {
      onSelect?.({ ...selected, unselected: [...selectedIDs, item.id] });
    }
  }

  function handleSelectSomeChange() {
    if (selectedIDs?.includes(item.id)) {
      onSelect?.(selectedIDs?.filter(id => id !== item.id));
    } else if (selectedIDs) {
      onSelect?.([...selectedIDs, item.id]);
    }
  }
}
