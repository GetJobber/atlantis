import React, { useEffect, useRef } from "react";
import { Icon } from "@jobber/components/Icon";
import styles from "./ComboboxContentSearch.css";
import { ComboboxSearchProps } from "../../../Combobox.types";

export function ComboboxContentSearch(props: ComboboxSearchProps): JSX.Element {
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
          updateSearch(event.currentTarget.value)
        }
        value={props.searchValue}
      />

      {props.searchValue && (
        <button
          className={styles.clearSearch}
          onClick={clearSearch}
          type="button"
          data-testid="ATL-Combobox-Content-Search-Clear"
          aria-label="Clear search"
        >
          <Icon name="remove" size="small" />
        </button>
      )}
    </div>
  );

  function updateSearch(value: string) {
    props.setSearchValue(value);
    props.handleSearchChange?.(value);
  }

  function clearSearch() {
    updateSearch("");
    searchRef.current?.focus();
  }
}
