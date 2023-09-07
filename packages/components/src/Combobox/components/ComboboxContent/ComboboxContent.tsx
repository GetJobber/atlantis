import React, { ReactElement, useState } from "react";
import classnames from "classnames";
import styles from "./ComboboxContent.css";
import { Icon } from "../../../Icon";
import { ComboboxContext } from "../../ComboboxProvider";

interface ComboboxContentProps {
  /**
   * options for the combobox
   */
  readonly options: string[];

  /**
   * onSelection handler.
   */
  readonly onSelection: (selection: string) => void;

  /**
   * actions
   */
  readonly children: ReactElement | ReactElement[];
}

export function ComboboxContent(props: ComboboxContentProps): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const { open } = React.useContext(ComboboxContext);

  const filteredOptions = props.options.filter(option =>
    option.toLowerCase().includes(searchValue.toLowerCase()),
  );

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

      {filteredOptions.length === 0 && <p>No results for {searchValue}</p>}

      {props.children && (
        <div className={styles.actions}>
          {React.Children.toArray(props.children).map(
            (child, index, childrenArray) => (
              <div
                key={index}
                className={
                  index === childrenArray.length - 1 ? styles.actionPadding : ""
                }
              >
                {child}
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  function handleSelection(event: React.MouseEvent<HTMLButtonElement>) {
    const selected = event.currentTarget.innerText;
    setSelectedOption(selected);
    setSearchValue("");
    props.onSelection(selected);
  }
}
