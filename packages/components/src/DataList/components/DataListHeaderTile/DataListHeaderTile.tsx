import React from "react";
import classnames from "classnames";
import styles from "./DataListHeaderTile.css";
import { DataListSortingArrows } from "./DataListSortingArrows";
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
  const [isDropDownOpen, setIsDropDownOpen] = React.useState(false);
  // new state variable to keep track of selected option
  const [selectedSortOption, setSelectedSortOption] = React.useState<{
    label: string;
    order: "asc" | "desc";
  } | null>(null);

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
    >
      <Text maxLines="single">{headers[headerKey]}</Text>
      {isSortable && sortableItem?.options && isDropDownOpen && (
        <ul className={styles.optionsList}>
          {sortableItem?.options?.map((option, index) => (
            <li
              className={
                option.label === selectedSortOption?.label
                  ? `${styles.option} ${styles.optionSelected}`
                  : styles.option
              }
              key={index}
              onClick={() => handleSelectChange(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {sortingState?.key === headerKey ? (
        <DataListSortingArrows order={sortingState.order} />
      ) : sortingState?.key !== headerKey && isSortable ? (
        <DataListSortingArrows order="none" />
      ) : null}
    </Tag>
  );

  function toggleSorting(sortingKey: string, order?: "asc" | "desc") {
    const isSameKey = sortingKey === sortingState?.key;

    if (isSameKey && sortingState?.order === "desc" && order !== "asc") {
      sorting?.onSort(undefined);

      return;
    }

    const newOrder =
      order || (isSameKey && sortingState?.order === "asc" ? "desc" : "asc");

    sorting?.onSort({
      key: sortingKey,
      order: newOrder,
    });
  }

  function handleOnClick() {
    if (!isSortable) return;

    if (sortableItem?.options) {
      setIsDropDownOpen(!isDropDownOpen);
    } else {
      toggleSorting(headerKey);
    }
  }

  function handleSelectChange(selectedOption: {
    label: string;
    order: "asc" | "desc";
  }) {
    if (sortableItem) {
      toggleSorting(sortableItem.key, selectedOption.order);
    }
    setSelectedSortOption(selectedOption);

    setIsDropDownOpen(false);
  }
}
