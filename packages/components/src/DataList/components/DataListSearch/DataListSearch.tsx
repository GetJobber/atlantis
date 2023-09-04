import React from "react";
import styles from "./DataListSearch.css";
import { InputText } from "../../../InputText";
import { getCompoundComponent } from "../../DataList.utils";
import { useDataListContext } from "../../context/DataListContext";

interface DataListSearchProps {
  onSearch: (search: string) => void;
  placeholder?: string;
}

// This component is meant to capture the props of the DataList.Filters
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DataListSearch(_: DataListSearchProps) {
  return null;
}

/**
 * Renders the DataList.Search component
 */
export function InternalDataListSearch() {
  const { children: parentChildren, title } = useDataListContext();
  console.log({ title });
  const component = getCompoundComponent<DataListSearchProps>(
    parentChildren,
    DataListSearch,
  );

  if (!component) return null;

  const { placeholder, onSearch } = component.props;

  return (
    <div className={styles.search}>
      <InputText
        placeholder={placeholder ? placeholder : `Search ${title}...`}
        onChange={(text: string) => onSearch(text)}
        prefix={{
          icon: "search",
        }}
      />
    </div>
  );
}
