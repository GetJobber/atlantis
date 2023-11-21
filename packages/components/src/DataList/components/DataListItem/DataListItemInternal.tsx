import React from "react";
import classNames from "classnames";
import { Checkbox } from "@jobber/components/Checkbox";
import { DataListObject } from "@jobber/components/DataList/DataList.types";
import { useBatchSelect } from "@jobber/components/DataList/hooks/useBatchSelect";
import styles from "../../DataList.css";

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
    hasSelectedAll,
    selectedIDs,
    onSelect,
  } = useBatchSelect();
  if (!canSelect) return children;

  return (
    <div
      className={classNames(styles.selectable, {
        [styles.selected]: hasAtLeastOneSelected,
      })}
    >
      {children}
      <Checkbox checked={getIsChecked()} onChange={handleChange} />
    </div>
  );

  function getIsChecked(): boolean | undefined {
    const isItemInSelectedIDs = selectedIDs.includes(item.id);

    // If we're in a "select all" state, the selectedID's becomes a list of
    // unchecked ID's.
    if (hasSelectedAll) return !isItemInSelectedIDs;

    // Otherwise, we're in a "select some" state, so we can just check if the
    // item is in the selectedIDs list.
    return isItemInSelectedIDs;
  }

  function handleChange() {
    if (selectedIDs?.includes(item.id)) {
      onSelect?.(selectedIDs?.filter(id => id !== item.id));
    } else if (selectedIDs) {
      onSelect?.([...selectedIDs, item.id]);
    }
  }
}
