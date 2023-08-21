import React, { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import styles from "./Combobox.css";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { Typography } from "../Typography";
import { Button } from "../Button";

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

  /**
   * Trigger label
   */
  readonly triggerLabel: string;
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

const ComboboxContext = React.createContext(
  {} as { open: boolean; setOpen: (open: boolean) => void },
);

const ComboboxContextProvider = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contentRef]);

  return (
    <ComboboxContext.Provider value={{ open, setOpen }}>
      <div className={styles.combobox} ref={contentRef}>
        {children}
      </div>
    </ComboboxContext.Provider>
  );
};

export const Combobox = ({ children }) => {
  return <ComboboxContextProvider>{children}</ComboboxContextProvider>;
};

const TriggerButton = ({ onClick, triggerLabel }) => {
  const { open, setOpen } = React.useContext(ComboboxContext);

  return <Button label={triggerLabel} onClick={() => setOpen(!open)} />;
};

const TriggerChip = ({ onClick, triggerLabel }) => {
  const { open, setOpen } = React.useContext(ComboboxContext);
  return (
    <div
      className={styles.trigger}
      onClick={() => {
        setOpen(!open);
      }}
    >
      <Text>{triggerLabel}</Text>
      <div className={styles.triggerIcon}>
        <Icon name="add" size="small" />
      </div>
    </div>
  );
};

const Content = ({ children, options, onSelection }) => {
  const { open, setOpen } = React.useContext(ComboboxContext);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchValue.toLowerCase()),
  );

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
  return (
    <div className={classnames(styles.content, !open && styles.hidden)}>
      <div className={styles.search}>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Search teammates"
          onChange={() => handleSearch(event)}
          value={searchValue}
        />

        {/* if there is a search value show the clear icon */}
        {searchValue && (
          <div
            className={styles.triggerIcon}
            onClick={() => setSearchValue("")}
            role="button"
          >
            <Icon name="remove" size="small" />
          </div>
        )}
      </div>
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
        {filteredOptions.length === 0 && <li>No results for {searchValue}</li>}
      </ul>

      {/* only render actions if their are any */}
      {children && <div className={styles.actions}>{children}</div>}
    </div>
  );
};

const Action = ({ onClick, label }) => {
  return (
    <button className={styles.action} onClick={onClick}>
      <Typography
        element="span"
        size="base"
        textColor="green"
        fontWeight="bold"
      >
        {label}
      </Typography>
    </button>
  );
};

Combobox.TriggerButton = TriggerButton;
Combobox.TriggerChip = TriggerChip;
Combobox.Content = Content;
Combobox.Action = Action;
