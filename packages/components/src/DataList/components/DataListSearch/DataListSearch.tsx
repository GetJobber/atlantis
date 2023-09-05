import React, { useCallback, useRef, useState } from "react";
import debounce from "lodash/debounce";
import classNames from "classnames";
import { tokens } from "@jobber/design";
import styles from "./DataListSearch.css";
import { InputText, InputTextRef } from "../../../InputText";
import { getCompoundComponent } from "../../DataList.utils";
import { useDataListContext } from "../../context/DataListContext";
import { SEARCH_DEBOUNCE_DELAY } from "../../DataList.const";
import { Button } from "../../../Button";
import { AnimatedSwitcher } from "../../../AnimatedSwitcher";

interface DataListSearchProps {
  readonly placeholder?: string;
  readonly onSearch: (search: string) => void;
}

// This component is meant to capture the props of the DataList.Search
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DataListSearch(_: DataListSearchProps) {
  return null;
}

/**
 * Renders the DataList.Search component
 */
export function InternalDataListSearch() {
  const inputRef = useRef<InputTextRef>(null);
  const [visible, setVisible] = useState(false);

  const { children: parentChildren, title } = useDataListContext();
  const component = getCompoundComponent<DataListSearchProps>(
    parentChildren,
    DataListSearch,
  );

  const debouncedSearch = useCallback(
    debounce(
      (value: string) => component?.props?.onSearch(value),
      SEARCH_DEBOUNCE_DELAY,
    ),
    [component?.props.onSearch],
  );

  if (!component) return null;
  const { placeholder } = component.props;

  return (
    <>
      <div className={styles.searchButton}>
        <AnimatedSwitcher
          switched={visible}
          initialChild={
            <Button
              variation="subtle"
              icon="search"
              ariaLabel="Search"
              onClick={toggleSearch}
            />
          }
          switchTo={
            <Button
              variation="subtle"
              icon="remove"
              ariaLabel="Close search bar"
              onClick={toggleSearch}
            />
          }
        />
      </div>

      <div
        className={classNames(styles.searchInput, {
          [styles.searchInputVisible]: visible,
        })}
      >
        <InputText
          ref={inputRef}
          placeholder={placeholder || `Search ${title}...`}
          onChange={debouncedSearch}
          prefix={{ icon: "search" }}
          size="small"
        />
      </div>
    </>
  );

  function toggleSearch() {
    const visibility = !visible;
    setVisible(visibility);

    if (visibility && inputRef.current) {
      setTimeout(inputRef.current.focus, tokens["timing-quick"]);
    }
  }
}
