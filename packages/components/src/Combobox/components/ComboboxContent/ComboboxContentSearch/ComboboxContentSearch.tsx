import React, { useDeferredValue, useEffect, useRef, useState } from "react";
import { Icon } from "@jobber/components/Icon";
import styles from "./ComboboxContentSearch.css";
import { ComboboxSearchProps } from "../../../Combobox.types";

export function ComboboxContentSearch(props: ComboboxSearchProps): JSX.Element {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState(props.searchValue);
  const deferredSearchTerm = useDeferredValue(searchTerm);

  if (deferredSearchTerm !== props.searchValue) {
    props.setSearchValue(deferredSearchTerm);
  }

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
        onChange={e => {
          setSearchTerm(e.target.value);
        }}
        value={searchTerm}
      />

      {searchTerm && (
        <button
          className={styles.clearSearch}
          onClick={() => {
            setSearchTerm("");
            searchRef.current?.focus();
          }}
          type="button"
          data-testid="ATL-Combobox-Content-Search-Clear"
          aria-label="Clear search"
        >
          <Icon name="remove" size="small" />
        </button>
      )}
    </div>
  );
}
