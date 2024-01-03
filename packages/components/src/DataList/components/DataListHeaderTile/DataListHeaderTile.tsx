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
  readonly onSortOptionSelected?: (key: string, order: string) => void;
}

export function DataListHeaderTile<T extends DataListObject>({
  headers,
  headerKey,
  onSortOptionSelected,
}: DataListHeaderTileProps<T>) {
  const { sorting } = useDataListContext();
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);

  const sortable = sorting?.sortable as (
    | string
    | { key: string; options: string[] }
  )[];

  const sortableItem = sortable?.find(
    (item: string | { key: string; options: string[] }) =>
      typeof item === "object" ? item.key === headerKey : item === headerKey,
  );
  // const isSortable = sorting?.sortable.includes(headerKey);
  const isSortable = Boolean(sortableItem);
  const sortingState = sorting?.state;

  const Tag = isSortable ? "button" : "div";

  // without this I'm not able to click anything within the dropdown after opening it
  const handleSelectClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  // handle change event of dropdown, calls onSortOptionSelected callback then hides dropdown
  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedOption = event.target.value;
    console.log("Selected Option:", selectedOption);
    onSortOptionSelected?.(headerKey, selectedOption);
    setIsDropdownVisible(false);
  }

  return (
    <Tag
      className={classnames(styles.headerLabel, {
        [styles.sortable]: isSortable,
      })}
      onClick={handleOnClick}
    >
      <Text maxLines="single">{headers[headerKey]}</Text>
      {/* if sortableItem is an object, show dropdown, renders each option in the array */}
      {isDropdownVisible && typeof sortableItem === "object" && (
        <select onClick={handleSelectClick} onChange={handleSelectChange}>
          {sortableItem.options.map(option => (
            <option key={option}>{option}</option>
          ))}
        </select>
      )}
      {sortingState?.key === headerKey ? (
        <DataListSortingArrows order={sortingState.order} />
      ) : sortingState?.key !== headerKey && isSortable ? (
        <DataListSortingArrows order="none" />
      ) : null}
    </Tag>
  );

  function toggleSorting(sortingKey: string) {
    const isSameKey = sortingKey === sortingState?.key;

    if (isSameKey && sortingState?.order === "desc") {
      sorting?.onSort(undefined);

      return;
    }

    sorting?.onSort({
      order: isSameKey && sortingState?.order === "asc" ? "desc" : "asc",
      key: sortingKey,
    });
  }

  function handleOnClick() {
    if (!isSortable) return;

    // if sortableItem is a string, toggle sorting, if it's an object, show dropdown
    if (typeof sortableItem === "string") {
      toggleSorting(headerKey);
    } else {
      setIsDropdownVisible(!isDropdownVisible);
    }
  }
}
