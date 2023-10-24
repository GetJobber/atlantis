import React from "react";
import classnames from "classnames";
import { Icon } from "@jobber/components/Icon";
import { Text } from "@jobber/components/Text";
import styles from "./ComboboxContentList.css";
import { ComboboxListProps } from "../../../Combobox.types";

export function ComboboxContentList(props: ComboboxListProps): JSX.Element {
  let hasSeenFirstSelected = false;

  return (
    <div className={styles.container}>
      {!props.showEmptyState && props.options.length > 0 && (
        <ul
          className={styles.optionsList}
          role="listbox"
          aria-multiselectable={props.multiselect}
          ref={props.optionsListRef}
        >
          {!props.showEmptyState &&
            props.options.map(option => {
              const isSelected = props.selected.some(
                selection => selection.id.toString() === option.id.toString(),
              );

              return (
                <li
                  ref={listItem => {
                    if (isSelected && !hasSeenFirstSelected) {
                      props.setFirstSelectedElement(listItem);
                      hasSeenFirstSelected = true;
                    }
                  }}
                  key={option.id}
                  tabIndex={-1}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => props.selectionHandler(option)}
                  className={classnames(styles.option)}
                >
                  {option.label}
                  {isSelected && <Icon name="checkmark" color="blue" />}
                </li>
              );
            })}
        </ul>
      )}
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
    </div>
  );
}

function getZeroIndexStateText(subjectNoun?: string) {
  if (subjectNoun) {
    return `You don't have any ${subjectNoun} yet`;
  }

  return "No options yet";
}
