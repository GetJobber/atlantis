import type { KeyboardEvent } from "react";
import React, { useEffect } from "react";
import { useOnKeyDown } from "@jobber/hooks/useOnKeyDown";
import { useRefocusOnActivator } from "@jobber/hooks/useRefocusOnActivator";
import { Icon } from "@jobber/components/Icon";
import styles from "./DataListSortingOptions.module.css";
import type { DataListSorting, SortableOptions } from "../../../DataList.types";

interface DataListSortingOptionsProps {
  readonly options: SortableOptions[];
  readonly selectedOption: DataListSorting | null;
  readonly onSelectChange: (selectedOption: SortableOptions) => void;
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsListRef, dataListHeaderTileRef, onClose]);

  return (
    <ul className={styles.optionsList} ref={optionsListRef}>
      {options.map(option => (
        <li
          className={styles.option}
          key={`${option.id}${option.order}`}
          onClick={() => onSelectChange(option)}
          onKeyDown={event => handleKeyDown(event, option)}
          tabIndex={0}
          data-value={option.id}
        >
          {option.label}
          {option.label === selectedOption?.label && (
            <Icon name="checkmark" color="interactiveSubtle" />
          )}
        </li>
      ))}
    </ul>
  );

  function handleKeyDown(event: KeyboardEvent, option: SortableOptions) {
    if (event.key === "Enter") {
      onSelectChange(option);
    }
  }

  function handleClickOutside(event: MouseEvent) {
    const isClickInside =
      optionsListRef.current?.contains(event.target as Node) ||
      dataListHeaderTileRef.current?.contains(event.target as Node);

    if (!isClickInside) {
      onClose();
    }
  }
}
