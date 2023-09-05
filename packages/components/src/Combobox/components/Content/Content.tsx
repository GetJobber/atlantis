import React, { useState } from "react";
import classnames from "classnames";
import styles from "./Content.css";
import { Icon } from "../../../Icon";
import { ComboboxContext } from "../../ComboboxProvider";

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

export function ComboboxContent(props: ContentProps): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const { open } = React.useContext(ComboboxContext);

  const filteredOptions = props.options.filter(option =>
    option.toLowerCase().includes(searchValue.toLowerCase()),
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
}
