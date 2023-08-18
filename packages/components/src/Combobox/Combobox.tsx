import React, { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import styles from "./Combobox.css";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { InputText } from "../InputText";
import { Typography } from "../Typography";

interface ComboboxProps {
  /**
   * onSelection handler.
   */
  onSelection: (selection: string) => void;

  /**
   * optional action
   */
  readonly action?: ActionProps;

  /**
   * options for the combobox
   */
  readonly options: string[];
}

interface ActionProps {
  /**
   * The function that should be performed when the action is pressed
   */
  readonly onClick: () => void;

  /**
   * Helper text displayed for press action
   */
  readonly label: string;
}

export function Combobox({ onSelection, action, options }: ComboboxProps) {
  const className = classnames(styles.combobox);
  const [open, setOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const listRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchValue.toLowerCase()),
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [listRef]);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  function handleSelection(event: React.MouseEvent<HTMLButtonElement>) {
    const selected = event.currentTarget.innerText;
    setSelectedOption(selected);
    setOpen(false);
    setSearchValue("");
    onSelection(selected);
  }

  function handleClearSelection() {
    setSelectedOption("");
    onSelection("");
  }

  return (
    <>
      {!selectedOption && (
        <div
          className={styles.trigger}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Text>Select a teammate</Text>
          <div className={styles.triggerIcon}>
            <Icon name="add" size="small" />
          </div>
        </div>
      )}

      {selectedOption && (
        <div
          className={styles.selection}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Text>{selectedOption}</Text>
          <div className={styles.triggerIcon} onClick={handleClearSelection}>
            <Icon name="remove" size="small" />
          </div>
        </div>
      )}

      {open && (
        <div className={className} ref={listRef}>
          <div className={styles.search}>
            <InputText
              placeholder="Search teammates"
              onChange={() => handleSearch(event)}
              size="small"
            />
          </div>

          <div className={styles.content}>
            <ul className={styles.optionsList}>
              {filteredOptions.map(option => (
                <li
                  className={classnames(
                    option === selectedOption && styles.selectedOption,
                  )}
                  role="button"
                  tabIndex={0}
                  key={option}
                  onClick={handleSelection}
                >
                  {option}
                </li>
              ))}

              {/* if there are no results matching the search value show no results item */}
              {filteredOptions.length === 0 && (
                <li>No results for {searchValue}</li>
              )}
            </ul>
          </div>
          {action && (
            <button className={styles.action} onClick={action?.onClick}>
              <Typography
                element="span"
                size="base"
                textColor="green"
                fontWeight="bold"
              >
                {action?.label}
              </Typography>
            </button>
          )}
        </div>
      )}
    </>
  );
}
