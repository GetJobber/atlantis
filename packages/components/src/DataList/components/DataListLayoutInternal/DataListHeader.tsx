import React from "react";
import { DataListLayoutInternal } from "./DataListLayoutInternal";
import { Breakpoints } from "../../DataList.const";
import styles from "../../DataList.css";
import {
  DataListHeader as DataListHeaderType,
  DataListItemTypeFromHeader,
  DataListLayoutProps,
  DataListObject,
  DataListProps,
} from "../../DataList.types";
import { sortSizeProp } from "../../DataList.utils";
import { Checkbox } from "../../../Checkbox";
import { useDataListContext } from "../../context/DataListContext";
import { AnimatedSwitcher } from "../../../AnimatedSwitcher";
import { Button } from "../../../Button";
import { Text } from "../../../Text";

interface DataListHeaderProps<T extends DataListObject> {
  readonly layouts: React.ReactElement<DataListLayoutProps<T>>[] | undefined;
  readonly mediaMatches?: Record<Breakpoints, boolean>;
  readonly headerData?: DataListItemTypeFromHeader<T, DataListHeaderType<T>>;
  readonly headerVisibility: NonNullable<DataListProps<T>["headerVisibility"]>;
}

export function DataListHeader<T extends DataListObject>({
  layouts,
  mediaMatches,
  headerData,
  headerVisibility,
}: DataListHeaderProps<T>) {
  const {
    totalCount = 0,
    selected = [],
    onSelectAll,
    onSelect,
  } = useDataListContext();
  const matchingMediaQueries = Object.keys(mediaMatches || {}).filter(
    (key): key is Breakpoints => !!mediaMatches?.[key as Breakpoints],
  );
  const sortedVisibleBreakpoints = sortSizeProp(matchingMediaQueries);

  // Determines if the header should be visible based on the headerVisibility
  const showHeader = sortedVisibleBreakpoints.reduce(
    (previousVisibility, breakpoint) => {
      return headerVisibility[breakpoint] ?? previousVisibility;
    },
    true,
  );

  if (!showHeader || !headerData) return <></>;

  const isAllSelected = Boolean(totalCount) && totalCount === selected.length;

  return (
    <DataListLayoutInternal
      layouts={layouts}
      mediaMatches={mediaMatches}
      renderLayout={layout => (
        <div className={styles.headerTitles}>
          <Checkbox
            checked={isAllSelected}
            indeterminate={selected.length > 0 && !isAllSelected}
            onChange={onSelectAll}
          />

          <AnimatedSwitcher
            switched={Boolean(selected.length)}
            initialChild={layout.props.children(headerData)}
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
      )}
    />
  );
}
