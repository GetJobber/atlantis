import React, { SetStateAction } from "react";
import classnames from "classnames";
import { Icon } from "@jobber/components/Icon";
import { Text } from "@jobber/components/Text";
import styles from "./ComboboxList.css";
import { ComboboxOption } from "../../Combobox.types";

interface ComboboxListProps {
  options: ComboboxOption[];
  showEmptyState: boolean;
  selected: ComboboxOption | null;
  optionsListRef: React.RefObject<HTMLUListElement>;
  setSelectedElement: React.Dispatch<SetStateAction<HTMLElement | null>>;
  selectionHandler: (option: ComboboxOption) => void;
  searchValue: string;
  subjectNoun?: string;
}

export function ComboboxList(props: ComboboxListProps): JSX.Element {
  return (
    <ul
      className={styles.optionsList}
      role="listbox"
      ref={props.optionsListRef}
    >
      {!props.showEmptyState &&
        props.options.map(option => {
          const isSelected =
            option.id.toString() === props.selected?.id.toString();

          return (
            <li
              ref={listItem => {
                if (isSelected) props.setSelectedElement(listItem);
              }}
              key={option.id}
              tabIndex={-1}
              role="option"
              aria-selected={isSelected}
              onClick={() => props.selectionHandler(option)}
              className={classnames(styles.option, {
                [styles.selectedOption]: isSelected,
              })}
            >
              {option.label}
              {isSelected && <Icon name="checkmark" color="blue" />}
            </li>
          );
        })}

      {!props.showEmptyState && props.options.length === 0 && (
        <div className={styles.filterMessage}>
          <Text variation="subdued">
            No results for {`“${props.searchValue}”`}
          </Text>
        </div>
      )}

      {props.showEmptyState && (
        <div className={styles.emptyStateMessage}>
          <Text variation="subdued">
            {getZeroIndexStateText(props.subjectNoun)}
          </Text>
        </div>
      )}
    </ul>
  );
}

function getZeroIndexStateText(subjectNoun?: string) {
  if (subjectNoun) {
    return `You don't have any ${subjectNoun} yet`;
  }

  return "No options yet";
}
