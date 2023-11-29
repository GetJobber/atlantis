import React from "react";
import { Text } from "@jobber/components/Text";
import styles from "./ComboboxContentList.css";
import { ComboboxListProps } from "../../../Combobox.types";
import { ComboboxOption } from "../../ComboboxOption/ComboboxOption";

export function ComboboxContentList(props: ComboboxListProps): JSX.Element {
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
              return (
                <ComboboxOption
                  key={option.id}
                  id={option.id}
                  label={option.label}
                />
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
