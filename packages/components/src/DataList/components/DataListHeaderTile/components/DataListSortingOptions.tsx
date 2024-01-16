import React from "react";
import { useOnKeyDown } from "@jobber/hooks/useOnKeyDown";
import { Icon } from "@jobber/components/Icon";
import styles from "../DataListHeaderTile.css";
import { SortableOptions } from "../../../DataList.types";

interface DataListSortingOptionsProps {
  readonly options: SortableOptions[];
  readonly selectedOption: SortableOptions | null;
  readonly onSelectChange: (selectedOption: SortableOptions) => void;
  readonly optionsListRef: React.RefObject<HTMLUListElement>;
  readonly onClose: () => void;
}

export function DataListSortingOptions({
  options,
  selectedOption,
  onSelectChange,
  optionsListRef,
  onClose,
}: DataListSortingOptionsProps) {
  useOnKeyDown(() => onClose(), "Escape");

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsListRef, onClose]);

  return (
    <ul className={styles.optionsList} ref={optionsListRef}>
      {options.map((option, index) => (
        <li
          className={
            option.label === selectedOption?.label
              ? `${styles.option} ${styles.optionSelected}`
              : styles.option
          }
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

  function handleKeyDown(event: React.KeyboardEvent, option: SortableOptions) {
    if (event.key === "Enter") {
      onSelectChange(option);
    }
  }

  function handleClickOutside(event: MouseEvent) {
    if (
      optionsListRef.current &&
      !optionsListRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  }
}
