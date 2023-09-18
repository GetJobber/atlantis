import classNames from "classnames";
import React from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { AnimatedSwitcher } from "../../../AnimatedSwitcher";
import { Button } from "../../../Button";
import { Checkbox } from "../../../Checkbox";
import { Text } from "../../../Text";
import { useDataListContext } from "../../context/DataListContext";
import styles from "../../DataList.css";

interface DataListHeaderCheckbox {
  readonly children: ReactElement;
}

export function DataListHeaderCheckbox({ children }: DataListHeaderCheckbox) {
  const {
    totalCount = 0,
    selected = [],
    onSelectAll,
    onSelect,
  } = useDataListContext();

  if (!onSelectAll && !onSelect) return children;

  const isAllSelected = Boolean(totalCount) && totalCount === selected.length;

  return (
    <div className={classNames(styles.selectable)}>
      <div
        className={classNames(styles.selectAllCheckbox, {
          [styles.visible]: Boolean(onSelectAll),
        })}
      >
        <Checkbox
          checked={isAllSelected}
          indeterminate={selected.length > 0 && !isAllSelected}
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
              label="Deselect All"
              onClick={() => onSelect?.([])}
              type="tertiary"
            />
          </div>
        }
      />
    </div>
  );
}
