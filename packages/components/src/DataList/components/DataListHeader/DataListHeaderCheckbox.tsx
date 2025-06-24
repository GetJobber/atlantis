import classNames from "classnames";
import React from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { AnimatedSwitcher } from "../../../AnimatedSwitcher";
import { Text } from "../../../Text";
import { Button } from "../../../Button";
import { Checkbox } from "../../../Checkbox";
import { useDataListContext } from "../../context/DataListContext";
import styles from "../../DataList.module.css";
import { InternalDataListBulkActions } from "../DataListBulkActions";
import { useResponsiveSizing } from "../../hooks/useResponsiveSizing";
import { useBatchSelect } from "../../hooks/useBatchSelect";
import { DataListSelectedType } from "../../DataList.types";

interface DataListHeaderCheckbox {
  readonly children: ReactElement;
}

export const DATA_LIST_HEADER_CHECKBOX_TEST_ID = "ATL-DataList-header-checkbox";
export const DATA_LIST_HEADER_BATCH_SELECT_TEST_ID =
  "ATL-DataList-header-batch-select";

export function DataListHeaderCheckbox({ children }: DataListHeaderCheckbox) {
  const { sm } = useResponsiveSizing();
  const { data, totalCount } = useDataListContext();
  const {
    canSelect,
    canSelectAll,
    hasAtLeastOneSelected,
    isSelectAll,
    selectedCount,
    selectedIDs,
    selected,
    onSelectAll,
    onSelect,
  } = useBatchSelect();

  // If there's no onSelect, we don't need to render the checkbox.
  // We'll still render the (invisible) checkbox even if only onSelect is provided for alignment.
  if (!canSelect) return children;

  const deselectText = sm ? "Deselect All" : "Deselect";
  const selectedLabel = selectedCount ? `${selectedCount} selected` : "";

  return (
    <div className={styles.selectable}>
      <div
        data-testid={DATA_LIST_HEADER_CHECKBOX_TEST_ID}
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

      <ColumnHeaderContent
        canSelectAll={canSelectAll}
        hasAtLeastOneSelected={hasAtLeastOneSelected}
        selectedCount={selectedCount}
        deselectText={deselectText}
        onSelect={onSelect}
      >
        {children}
      </ColumnHeaderContent>
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

function ColumnHeaderContent({
  canSelectAll,
  children,
  hasAtLeastOneSelected,
  selectedCount,
  deselectText,
  onSelect,
}: {
  readonly canSelectAll: boolean;
  readonly children: ReactElement;
  readonly hasAtLeastOneSelected: boolean;
  readonly selectedCount: number;
  readonly deselectText: string;
  readonly onSelect?: (selected: DataListSelectedType<string | number>) => void;
}) {
  if (canSelectAll) {
    return (
      <AnimatedSwitcher
        switched={hasAtLeastOneSelected}
        initialChild={children}
        switchTo={
          <div
            data-testid={DATA_LIST_HEADER_BATCH_SELECT_TEST_ID}
            className={styles.batchSelectContainer}
          >
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
    );
  } else {
    return children;
  }
}
