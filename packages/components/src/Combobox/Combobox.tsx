import React, { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import styles from "./Combobox.css";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { InputText } from "../InputText";
import { Typography } from "../Typography";

interface ComboboxProps {
  /**
   * onSelection handler.
   */
  onSelection?(event: React.MouseEvent<HTMLButtonElement>): void;

  /**
   * optional action
   */
  readonly action?: ActionProps;
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

export function Combobox({ onSelection, action }: ComboboxProps) {
  const className = classnames(styles.combobox);
  const [open, setOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const listRef = useRef<HTMLDivElement>(null);

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
    setSearchValue(event.currentTarget.value);
  }
  function handleSelection(event: React.MouseEvent<HTMLButtonElement>) {
    setSelectedOption(event.currentTarget.innerText);
    setOpen(false);
    setSearchValue("");
    onSelection(event.currentTarget.innerText);
  }

  function handleClearSelection() {
    setSelectedOption("");
    onSelection("");
  }

  const options = ["John Doe", "Jane Doe 2", "Joe Blow"];

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
          <InputText
            placeholder="Search teammates"
            onChange={() => handleSearch}
            size="small"
          />
          <div className={styles.content}>
            <ul className={styles.optionsList}>
              {options.map(option => (
                <li
                  role="button"
                  tabIndex={0}
                  key={option}
                  onClick={handleSelection}
                >
                  {option}
                </li>
              ))}
            </ul>
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
        </div>
      )}
    </>
  );
}
