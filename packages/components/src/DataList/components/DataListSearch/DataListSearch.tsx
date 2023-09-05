import React, { useCallback, useState } from "react";
import debounce from "lodash/debounce";
import classNames from "classnames";
import styles from "./DataListSearch.css";
import { InputText } from "../../../InputText";
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
  const { children: parentChildren, title } = useDataListContext();
  const component = getCompoundComponent<DataListSearchProps>(
    parentChildren,
    DataListSearch,
  );

  const [visible, setVisible] = useState(false);

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
          [styles.searchVisible]: visible,
        })}
      >
        <InputText
          placeholder={placeholder || `Search ${title}...`}
          onChange={debouncedSearch}
          prefix={{ icon: "search" }}
          size="small"
        />
      </div>
    </>
  );

  function toggleSearch() {
    setVisible(!visible);
  }
}
