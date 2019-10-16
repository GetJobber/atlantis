import React, { useEffect, useState } from "react";
import classnames from "classnames";
import useEventListener from "@use-it/event-listener";
import { Option } from "./Option";
import styles from "./Autocomplete.css";
import { Text } from "../Text";
import { Icon } from "../Icon";

enum IndexChange {
  Previous = -1,
  Next = 1,
}

interface MenuProps {
  visible: boolean;
  options: Option[];
  selectedOption?: Option;
  onOptionSelect(chosenOption: Option): void;
}

export function Menu({
  visible,
  options,
  selectedOption,
  onOptionSelect,
}: MenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const optionMenuClass = classnames(styles.options, {
    [styles.visible]: visible,
  });

  setupKeyListeners();

  useEffect(() => setSelectedIndex(-1), [options]);

  return (
    <div className={optionMenuClass}>
      {options.map((option, index) => {
        const optionClass = classnames(styles.option, {
          [styles.active]: index === selectedIndex,
        });
        return (
          <button
            className={optionClass}
            key={option.value}
            onMouseDown={handleMouseDown(option)}
          >
            <div className={styles.icon}>
              {isOptionSelected(option) && (
                <Icon name="checkmark" size="small" />
              )}
            </div>
            <div className={styles.text}>
              <Text>{option.label}</Text>
            </div>
          </button>
        );
      })}
    </div>
  );

  function isOptionSelected(option: Option) {
    return selectedOption && option.value === selectedOption.value;
  }

  function handleMouseDown(option: Option) {
    return () => {
      onOptionSelect(option);
    };
  }

  function setupKeyListeners() {
    useOnKeyDown("ArrowDown", (event: KeyboardEvent) => {
      event.preventDefault();
      setSelectedIndex(
        Math.min(options.length - 1, selectedIndex + IndexChange.Next),
      );
    });

    useOnKeyDown("ArrowUp", (event: KeyboardEvent) => {
      event.preventDefault();
      setSelectedIndex(Math.max(0, selectedIndex + IndexChange.Previous));
    });

    useOnKeyDown("Enter", (event: KeyboardEvent) => {
      event.preventDefault();
      onOptionSelect(options[selectedIndex]);
    });
  }
}

// Split this out into a hooks package.
function useOnKeyDown(
  keyName: string,
  handler: (event: KeyboardEvent) => boolean | void,
) {
  // Pending: https://github.com/donavon/use-event-listener/pull/12
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //@ts-ignore
  useEventListener<KeyboardEvent>("keydown", (event: KeyboardEvent) => {
    if (event.key === keyName) {
      handler(event);
    }
  });
}
