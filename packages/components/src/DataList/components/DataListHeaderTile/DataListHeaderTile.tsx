/* eslint-disable max-statements */
import React from "react";
import classnames from "classnames";
import { useFocusTrap } from "@jobber/hooks/useFocusTrap";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import styles from "./DataListHeaderTile.css";
import { DataListSortingArrows } from "./DataListSortingArrows";
import { DataListSortingOptions } from "./components/DataListSortingOptions";
import { Text } from "../../../Text";
import { useDataListContext } from "../../context/DataListContext";
import {
  DataListHeader,
  DataListObject,
  SortableOptions,
} from "../../DataList.types";

interface DataListHeaderTileProps<T extends DataListObject> {
  readonly headers: DataListHeader<T>;
  readonly headerKey: string;
  readonly visible: boolean;
}

export function DataListHeaderTile<T extends DataListObject>({
  headers,
  headerKey,
  visible = false,
}: DataListHeaderTileProps<T>) {
  useRefocusOnActivator(visible);
  const { sorting } = useDataListContext();
  const [isDropDownOpen, setIsDropDownOpen] = React.useState(false);

  const optionsListRef = useFocusTrap<HTMLUListElement>(isDropDownOpen);
  const dataListHeaderTileRef = React.useRef(null);

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
      {sortingState?.key === headerKey ? (
        <DataListSortingArrows order={sortingState.order} />
      ) : sortingState?.key !== headerKey && isSortable ? (
        <DataListSortingArrows order="none" />
      ) : null}
    </Tag>
  );

  function toggleSorting(
    newSortingKey: string,
    newId?: string,
    newLabel?: string,
    newOrder?: "asc" | "desc",
  ) {
    const isSameKey = newSortingKey === sortingState?.key;
    const isDescending = sortingState?.order === "desc";

    if (isSameKey && isDescending && newOrder === undefined) {
      sorting?.onSort(undefined);

      return;
    }

    const sortingOrder =
      newOrder || (isSameKey && !isDescending ? "desc" : "asc");

    setSorting(newSortingKey, newId, newLabel, sortingOrder);
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

    if (sortableItem?.options) {
      setIsDropDownOpen(!isDropDownOpen);
    } else {
      const headerValue = headers[headerKey];
      const id = sortableItem?.options?.[0]?.id || headerKey;

      if (headerValue !== undefined) {
        toggleSorting(id, headerKey, headerValue);
      }
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
