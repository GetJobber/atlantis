/* eslint-disable max-statements */
import React, { useRef, useState } from "react";
import classnames from "classnames";
import { useFocusTrap } from "@jobber/hooks/useFocusTrap";
import styles from "./DataListHeaderTile.module.css";
import { DataListSortingArrows } from "./DataListSortingArrows";
import { DataListSortingOptions } from "./components/DataListSortingOptions";
import { Text } from "../../../Text";
import { useDataListContext } from "../../context/DataListContext";
import type {
  DataListHeader,
  DataListObject,
  SortableOptions,
} from "../../DataList.types";

interface DataListHeaderTileProps<T extends DataListObject> {
  readonly headers: DataListHeader<T>;
  readonly headerKey: string;
}

export function DataListHeaderTile<T extends DataListObject>({
  headers,
  headerKey,
}: DataListHeaderTileProps<T>) {
  const { sorting } = useDataListContext();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const optionsListRef = useFocusTrap<HTMLUListElement>(isDropDownOpen);
  const dataListHeaderTileRef = useRef(null);

  const sortableItem = sorting?.sortable.find(item => item.key === headerKey);
  const isSortable = Boolean(sortableItem);
  const sortingState = sorting?.state;

  const Tag = isSortable ? "button" : "div";

  return (
    <Tag
      className={classnames(styles.headerLabel, {
        [styles.sortable]: isSortable,
      })}
      onClick={handleOnClick}
      ref={dataListHeaderTileRef}
      type={isSortable ? "button" : undefined}
    >
      <Text maxLines="single">{headers[headerKey]}</Text>
      {isSortable && sortableItem?.options && isDropDownOpen && (
        <DataListSortingOptions
          options={sortableItem.options}
          selectedOption={sorting?.state || null}
          onSelectChange={handleSelectChange}
          onClose={() => setIsDropDownOpen(false)}
          optionsListRef={optionsListRef}
          dataListHeaderTileRef={dataListHeaderTileRef}
        />
      )}
      {isSortable && (
        <DataListSortingArrows
          order={sortingState?.key === headerKey ? sortingState.order : "none"}
          headerKey={headerKey}
        />
      )}
    </Tag>
  );

  function toggleSorting(
    newSortingKey: string,
    newId?: string,
    newLabel?: string,
  ) {
    const isSameKey = newSortingKey === sortingState?.key;
    const isDescending = sortingState?.order === "desc";

    if (isSameKey && isDescending) {
      sorting?.onSort(undefined);

      return;
    }

    const sortingOrder = isSameKey ? "desc" : "asc";
    const label =
      sortableItem?.options?.find(option => {
        return option.order === sortingOrder;
      })?.label || newLabel;

    setSorting(newSortingKey, newId, label, sortingOrder);
  }

  function setSorting(
    newSortingKey: string,
    newId?: string,
    newLabel?: string,
    newOrder?: "asc" | "desc",
  ) {
    sorting?.onSort({
      key: newSortingKey,
      id: newId,
      label: newLabel,
      order: newOrder,
    });
  }

  function handleOnClick() {
    if (!isSortable) return;

    if (sortableItem?.sortType === "dropdown") {
      setIsDropDownOpen(!isDropDownOpen);
    } else {
      const id = sortableItem?.options?.[0]?.id || headerKey;
      toggleSorting(headerKey, id, headers[headerKey]);
    }
  }

  function handleSelectChange(newSortOption: SortableOptions) {
    if (sortableItem) {
      setSorting(
        sortableItem.key,
        newSortOption.id,
        newSortOption.label,
        newSortOption.order,
      );
    }

    setIsDropDownOpen(true);
  }
}
