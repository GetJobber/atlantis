import React, { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import styles from "./Combobox.css";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { Typography } from "../Typography";
import { Button } from "../Button";

interface ComboboxProps {
  readonly children: React.ReactNode;
}

interface ContentProps {
  /**
   * options for the combobox
   */
  readonly options: string[];

  /**
   * onSelection handler.
   */
  onSelection: (selection: string) => void;

  /**
   * actions
   */
  readonly children: React.ReactNode;
}
interface TriggerProps {
  /**
   * Trigger label
   */
  readonly label: string;
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

const ComboboxContextProvider = (props: ComboboxProps) => {
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
        {props.children}
      </div>
    </ComboboxContext.Provider>
  );
};

export const Combobox = (props: ComboboxProps) => {
  return <ComboboxContextProvider>{props.children}</ComboboxContextProvider>;
};

const TriggerButton = (props: TriggerProps) => {
  const { open, setOpen } = React.useContext(ComboboxContext);

  return <Button label={props.label} onClick={() => setOpen(!open)} />;
};

const TriggerChip = (props: TriggerProps) => {
  const { open, setOpen } = React.useContext(ComboboxContext);
  return (
    <div
      className={styles.trigger}
      onClick={() => {
        setOpen(!open);
      }}
    >
      <Text>{props.label}</Text>
      <div className={styles.triggerIcon}>
        <Icon name="add" size="small" />
      </div>
    </div>
  );
};

const Content = (props: ContentProps) => {
  const { open, setOpen } = React.useContext(ComboboxContext);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  const filteredOptions = props.options.filter(option =>
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
    props.onSelection(selected);
  }
  return (
    <div className={classnames(styles.content, !open && styles.hidden)}>
      <div className={styles.search}>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Search teammates"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleSearch(event)
          }
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

      {filteredOptions.map(option => (
        <button
          className={classnames(
            option === selectedOption && styles.selectedOption,
          )}
          role="button"
          tabIndex={0}
          key={option}
          onClick={handleSelection}
        >
          {option}
        </button>
      ))}

      {/* if there are no results matching the search value show no results item */}
      {filteredOptions.length === 0 && <p>No results for {searchValue}</p>}

      {/* only render actions if their are any */}
      {props.children && <div className={styles.actions}>{props.children}</div>}
    </div>
  );
};

const Action = (props: ActionProps) => {
  return (
    <button className={styles.action} onClick={props.onClick}>
      <Typography
        element="span"
        size="base"
        textColor="green"
        fontWeight="bold"
      >
        {props.label}
      </Typography>
    </button>
  );
};

Combobox.TriggerButton = TriggerButton;
Combobox.TriggerChip = TriggerChip;
Combobox.Content = Content;
Combobox.Action = Action;
