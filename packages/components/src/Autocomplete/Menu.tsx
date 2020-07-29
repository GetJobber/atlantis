import React, { useEffect, useState } from "react";
import classnames from "classnames";
import useEventListener from "@use-it/event-listener";
import { Option } from "./Option";
import styles from "./Autocomplete.css";
import { Text } from "../Text";
import { Icon } from "../Icon";
import { Typography } from "../Typography";

enum IndexChange {
  Previous = -1,
  Next = 1,
}

interface MenuProps {
  readonly visible: boolean;
  readonly options: Option[];
  readonly separators: boolean;
  readonly checkmarks: boolean;
  readonly selectedOption?: Option;
  onOptionSelect(chosenOption: Option): void;
}

export function Menu({
  visible,
  options,
  separators = false,
  checkmarks = true,
  selectedOption,
  onOptionSelect,
}: MenuProps) {
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const optionMenuClass = classnames(styles.options, {
    [styles.visible]: visible,
  });

  setupKeyListeners();

  useEffect(() => setHighlightedIndex(0), [options]);

  return (
    <div className={optionMenuClass}>
      {options.map((option, index) => {
        const optionClass = classnames(styles.option, {
          [styles.active]: index === highlightedIndex,
          [styles.separator]: separators,
        });
        if (option.heading) {
          return (
            <div key={option.label} className={styles.heading}>
              <Typography element="h5" fontWeight="bold">
                {option.label}
              </Typography>
            </div>
          );
        }
        return (
          <button
            className={optionClass}
            key={option.value}
            onMouseDown={onOptionSelect.bind(undefined, option)}
          >
            {checkmarks && (
              <div className={styles.icon}>
                {isOptionSelected(option) && (
                  <Icon name="checkmark" size="small" />
                )}
              </div>
            )}
            <div className={styles.text}>
              <div className={styles.label}>
                <Text>{option.label}</Text>
                {option.description !== undefined && (
                  <Typography>{option.description}</Typography>
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
      if (!visible) return;

      event.preventDefault();
      setHighlightedIndex(
        Math.min(options.length - 1, highlightedIndex + IndexChange.Next),
      );
    });

    useOnKeyDown("ArrowUp", (event: KeyboardEvent) => {
      if (!visible) return;

      event.preventDefault();
      setHighlightedIndex(Math.max(0, highlightedIndex + IndexChange.Previous));
    });

    useOnKeyDown("Enter", (event: KeyboardEvent) => {
      if (!visible) return;

      event.preventDefault();
      onOptionSelect(options[highlightedIndex]);
    });
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
