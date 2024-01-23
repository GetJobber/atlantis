import React from "react";
import { useOnKeyDown } from "@jobber/hooks/useOnKeyDown";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import { Icon } from "@jobber/components/Icon";
import styles from "./DataListSortingOptions.css";
import { DataListSorting } from "../../../DataList.types";

interface DataListSortingOptionsProps {
  readonly options: DataListSorting[];
  readonly selectedOption: DataListSorting | null;
  readonly onSelectChange: (selectedOption: DataListSorting) => void;
  readonly onClose: () => void;
  readonly optionsListRef: React.RefObject<HTMLUListElement>;
  readonly dataListHeaderTileRef: React.RefObject<HTMLElement>;
}

export function DataListSortingOptions({
  options,
  selectedOption,
  onSelectChange,
  onClose,
  optionsListRef,
  dataListHeaderTileRef,
}: DataListSortingOptionsProps) {
  useRefocusOnActivator(!optionsListRef.current);
  useOnKeyDown(() => onClose(), "Escape");

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsListRef, dataListHeaderTileRef, onClose]);

  return (
    <ul className={styles.optionsList} ref={optionsListRef}>
      {options.map((option, index) => (
        <li
          className={styles.option}
          key={index}
          onClick={() => onSelectChange(option)}
          onKeyDown={event => handleKeyDown(event, option)}
          tabIndex={0}
        >
          {option.label}
          {option.label === selectedOption?.label && (
            <Icon name="checkmark" color="blue" />
          )}
        </li>
      ))}
    </ul>
  );

  function handleKeyDown(event: React.KeyboardEvent, option: DataListSorting) {
    if (event.key === "Enter") {
      onSelectChange(option);
    }
  }

  function handleClickOutside(event: MouseEvent) {
    const isClickInsideOptions = optionsListRef.current?.contains(
      event.target as Node,
    );
    const isClickInsideHeader = dataListHeaderTileRef.current?.contains(
      event.target as Node,
    );

    if (!isClickInsideOptions && !isClickInsideHeader) {
      onClose();
    }
  }
}
