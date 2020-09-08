import React, { useEffect, useState } from "react";
import classnames from "classnames";
import useEventListener from "@use-it/event-listener";
import { AnyOption, Option } from "./Option";
import styles from "./Autocomplete.css";
import { Text } from "../Text";
import { Icon } from "../Icon";
import { Heading } from "../Heading";

enum IndexChange {
  Previous = -1,
  Next = 1,
}

interface MenuProps {
  readonly visible: boolean;
  readonly options: Option[];
  readonly selectedOption?: Option;
  onOptionSelect(chosenOption: Option): void;
}

export function Menu({
  visible,
  options,
  selectedOption,
  onOptionSelect,
}: MenuProps) {
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const optionMenuClass = classnames(styles.options, {
    [styles.visible]: visible,
  });

  const detectSeparatorCondition = (option: Option) =>
    option.description || option.details;

  const detectGroups = (option: AnyOption) => option.options;

  const addSeparators = options.some(detectSeparatorCondition);

  const initialHighlight = options.some(detectGroups) ? 1 : 0;

  setupKeyListeners();

  useEffect(() => setHighlightedIndex(initialHighlight), [options]);

  return (
    <div className={optionMenuClass}>
      {options.map((option, index) => {
        const optionClass = classnames(styles.option, {
          [styles.active]: index === highlightedIndex,
          [styles.separator]: addSeparators,
        });
        if (isGroup(option)) {
          return (
            <div key={option.label} className={styles.heading}>
              <Heading level={5}>{option.label}</Heading>
            </div>
          );
        }
        return (
          <button
            className={optionClass}
            key={option.value}
            onMouseDown={onOptionSelect.bind(undefined, option)}
          >
            <div className={styles.icon}>
              {isOptionSelected(option) && (
                <Icon name="checkmark" size="small" />
              )}
            </div>
            <div className={styles.text}>
              <div className={styles.label}>
                <Text>{option.label}</Text>
                {option.description !== undefined && (
                  <Text variation="subdued">{option.description}</Text>
                )}
              </div>
              {option.details !== undefined && (
                <div className={styles.details}>
                  <Text>{option.details}</Text>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );

  function isOptionSelected(option: Option) {
    return selectedOption && selectedOption.value === option.value;
  }

  function setupKeyListeners() {
    useOnKeyDown("ArrowDown", (event: KeyboardEvent) => {
      const indexChange = arrowKeyPress(event, IndexChange.Next);
      if (indexChange) {
        setHighlightedIndex(
          Math.min(options.length - 1, highlightedIndex + indexChange),
        );
      }
    });

    useOnKeyDown("ArrowUp", (event: KeyboardEvent) => {
      const indexChange = arrowKeyPress(event, IndexChange.Previous);
      if (indexChange) {
        setHighlightedIndex(Math.max(0, highlightedIndex + indexChange));
      }
    });

    useOnKeyDown("Enter", (event: KeyboardEvent) => {
      if (!visible) return;
      if (isGroup(options[highlightedIndex])) return;

      event.preventDefault();
      onOptionSelect(options[highlightedIndex]);
    });
  }

  function arrowKeyPress(event: KeyboardEvent, direction: number) {
    if (!visible) return;
    event.preventDefault();
    const requestedIndex = options[highlightedIndex + direction];
    return requestedIndex && isGroup(requestedIndex)
      ? direction + direction
      : direction;
  }
}

// Split this out into a hooks package.
function useOnKeyDown(
  keyName: string,
  handler: (event: KeyboardEvent) => boolean | void,
) {
  // Pending: https://github.com/donavon/use-event-listener/pull/12
  // The types in useEventListener mistakenly require a SyntheticEvent for the passed generic.
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //@ts-ignore
  useEventListener<KeyboardEvent>("keydown", (event: KeyboardEvent) => {
    if (event.key === keyName) {
      handler(event);
    }
  });
}

function isGroup(option: AnyOption) {
  if (option.options) return true;
  return false;
}
