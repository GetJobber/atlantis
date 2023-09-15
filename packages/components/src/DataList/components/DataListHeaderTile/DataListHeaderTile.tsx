import React from "react";
import classnames from "classnames";
import styles from "./DataListHeaderTile.css";
import { SortingArrows } from "./SortingArrows";
import { Text } from "../../../Text";
import { useDataListContext } from "../../context/DataListContext";
import { DataListHeader, DataListObject } from "../../DataList.types";

interface DataListHeaderTileProps<T extends DataListObject> {
  readonly headers: DataListHeader<T>;
  readonly headerKey: string;
}

export function DataListHeaderTile<T extends DataListObject>({
  headers,
  headerKey,
}: DataListHeaderTileProps<T>) {
  const { sorting } = useDataListContext();

  const isSortable = sorting?.sortable.includes(headerKey);
  const sortingState = sorting?.state;

  const Tag = isSortable ? "button" : "div";

  return (
    <Tag
      className={classnames(styles.headerLabel, {
        [styles.sortable]: isSortable,
      })}
      onClick={handleOnClick}
    >
      <Text maxLines="single">{headers[headerKey]}</Text>
      {sortingState?.key === headerKey && (
        <SortingArrows order={sortingState.direction} />
      )}
    </Tag>
  );

  function toggleSorting(sortingKey: string) {
    if (sortingState?.direction === "desc") {
      sorting?.onSort(undefined);
      return;
    }

    sorting?.onSort({
      direction: sortingState?.direction === "asc" ? "desc" : "asc",
      key: sortingKey,
    });
  }

  function handleOnClick() {
    if (!isSortable) return;

    toggleSorting(headerKey);
  }
}
