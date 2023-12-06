import classNames from "classnames";
import React, { ReactElement } from "react";
import { AnimatedSwitcher } from "../../../AnimatedSwitcher";
import { Text } from "../../../Text";
import { Button } from "../../../Button";
import { Checkbox } from "../../../Checkbox";
import { useDataListContext } from "../../context/DataListContext";
import styles from "../../DataList.css";
import { InternalDataListBulkActions } from "../DataListBulkActions";
import { useResponsiveSizing } from "../../hooks/useResponsiveSizing";
import { useBatchSelect } from "../../hooks/useBatchSelect";

interface DataListHeaderCheckbox {
  readonly children: ReactElement;
}

export function DataListHeaderCheckbox({ children }: DataListHeaderCheckbox) {
  const { sm } = useResponsiveSizing();
  const { data, totalCount } = useDataListContext();
  const {
    canSelectAll,
    hasAtLeastOneSelected,
    isSelectAll,
    selectedCount,
    selectedIDs,
    selected,
    onSelectAll,
    onSelect,
  } = useBatchSelect();

  // If there's no onSelectAll or onSelect, we don't need to render the checkbox.
  if (!canSelectAll) return children;

  const deselectText = sm ? "Deselect All" : "Deselect";
  const selectedLabel = selectedCount ? `${selectedCount} selected` : "";

  return (
    <div className={styles.selectable}>
      <div
        className={classNames(styles.selectAllCheckbox, {
          [styles.visible]: canSelectAll,
        })}
      >
        <Checkbox
          checked={isAllSelected()}
          indeterminate={isIndeterminate()}
          onChange={handleSelectAll}
        >
          <div className={styles.srOnly}>{selectedLabel}</div>
        </Checkbox>
      </div>

      <AnimatedSwitcher
        switched={hasAtLeastOneSelected}
        initialChild={children}
        switchTo={
          <div className={styles.batchSelectContainer}>
            <div className={styles.headerBatchSelect}>
              {Boolean(selectedCount) && <Text>{selectedCount} selected</Text>}
              <Button
                label={deselectText}
                onClick={() => onSelect?.([])}
                type="tertiary"
              />
            </div>
            <InternalDataListBulkActions />
          </div>
        }
      />
    </div>
  );

  function isIndeterminate() {
    if (isSelectAll) return selectedIDs.length > 0;

    return selectedCount > 0 && !isAllSelected();
  }

  function isAllSelected() {
    if (isSelectAll) return true;

    // If there's a totalCount, we can use that to accurately determine if the
    // user have "selected all".
    if (totalCount) {
      return totalCount === selectedCount;
    }

    // Otherwise, we'll use the total count of data. This is not as reliable, as
    // it's possible that the would select all loaded data while we're
    // loading more. It's still hard to get to that state as the load more
    // triggers before you see the last item.
    return data.length > 0 && selectedCount >= data.length;
  }

  function handleSelectAll() {
    if (isAllSelected()) {
      return onSelectAll?.([]);
    }

    onSelectAll?.({ totalCount: getTotalCount(), unselected: [] });
  }

  function getTotalCount() {
    if (selected && "totalCount" in selected) return selected.totalCount;
    if (totalCount) return totalCount;

    return 0;
  }
}
