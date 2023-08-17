import React, { useRef, useState } from "react";
import classnames from "classnames";
import { set } from "lodash";
import styles from "./Combobox.css";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Text } from "../Text";

interface ComboboxProps {
  /**
   * onSelection handler.
   */
  onSelection?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export function Combobox({ onSelection }: ComboboxProps) {
  const className = classnames(styles.combobox);
  const [open, setOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const listRef = useRef<HTMLDivElement>(null);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
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
          <input
            className={styles.input}
            placeholder="Search teammates"
            type="text"
            onChange={handleSearch}
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
            <Button type="tertiary" label="Add a teammate" />
          </div>
        </div>
      )}
    </>
  );
}
