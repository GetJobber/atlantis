import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import styles from "./ComboboxSearch.css";
import { Icon } from "../../../Icon";

export function ComboboxSearch(props: {
  placeholder?: string;
  searchValue: string;
  open: boolean;
  setSearchValue: Dispatch<SetStateAction<string>>;
}): JSX.Element {
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.open) {
      setTimeout(() => {
        searchRef.current?.focus();
      }, 0);
    }
  }, [props.open]);

  return (
    <div className={styles.search}>
      <input
        type="search"
        ref={searchRef}
        className={styles.searchInput}
        placeholder={
          props.placeholder ? `Search ${props.placeholder}` : "Search"
        }
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleSearch(event)
        }
        value={props.searchValue}
      />

      {props.searchValue && (
        <button
          className={styles.clearSearch}
          onClick={clearSearch}
          data-testid="ATL-Combobox-Content-Search-Clear"
          aria-label="Clear search"
        >
          <Icon name="remove" size="small" />
        </button>
      )}
    </div>
  );

  function clearSearch() {
    props.setSearchValue("");
    searchRef.current?.focus();
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    props.setSearchValue(event.target.value);
  }
}
