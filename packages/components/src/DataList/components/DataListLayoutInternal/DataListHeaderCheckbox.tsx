import classNames from "classnames";
import React from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { AnimatedSwitcher } from "../../../AnimatedSwitcher";
import { Button } from "../../../Button";
import { Checkbox } from "../../../Checkbox";
import { Text } from "../../../Text";
import { useDataListContext } from "../../context/DataListContext";
import styles from "../../DataList.css";
import { InternalDataListBulkActions } from "../DataListBulkActions";
import { useResponsiveSizing } from "../../hooks/useResponsiveSizing";

interface DataListHeaderCheckbox {
  readonly children: ReactElement;
}

export function DataListHeaderCheckbox({ children }: DataListHeaderCheckbox) {
  const {
    data,
    totalCount,
    selected = [],
    onSelectAll,
    onSelect,
  } = useDataListContext();

  if (!onSelectAll && !onSelect) return children;

  const { sm } = useResponsiveSizing();

  // Show "Deselect All" if breakpoint is sm or higher
  const deselectText = sm ? "Deselect All" : "Deselect";

  return (
    <div className={classNames(styles.selectable)}>
      <div
        className={classNames(styles.selectAllCheckbox, {
          [styles.visible]: Boolean(onSelectAll),
        })}
      >
        <Checkbox
          checked={isAllSelected()}
          indeterminate={selected.length > 0 && !isAllSelected()}
          onChange={onSelectAll}
        />
      </div>

      <AnimatedSwitcher
        switched={Boolean(selected.length)}
        initialChild={children}
        switchTo={
          <div className={styles.headerBatchSelect}>
            <Text>
              <b>{selected.length} selected</b>
            </Text>
            <Button
              label={deselectText}
              onClick={() => onSelect?.([])}
              type="tertiary"
            />
            <InternalDataListBulkActions />
          </div>
        }
      />
    </div>
  );

  function isAllSelected() {
    // If there's a totalCount, we can use that to accurately determine if the
    // user have "selected all".
    if (totalCount) {
      return totalCount === selected.length;
    }

    // Otherwise, we'll use the total count of data. This is not as reliable, as
    // it's possible that the would select all loaded data while we're
    // loading more. It's still hard to get to that state as the load more
    // triggers before you see the last item.
    return data.length > 0 && selected.length >= data.length;
  }
}
