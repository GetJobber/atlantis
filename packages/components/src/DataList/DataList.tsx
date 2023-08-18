import React, { useState } from "react";
import styles from "./DataList.css";
import { EmptyState } from "./components/EmptyState";
import {
  DataListLayout,
  DataListLayoutProps,
} from "./components/DataListLayout";
import { DataListObject, DataListProps } from "./DataList.types";
import {
  generateDataListEmptyState,
  generateHeaderElements,
  generateListItemElements,
  getCompoundComponent,
} from "./DataList.utils";
import { Text } from "../Text";
import { Glimmer } from "../Glimmer";
import { Heading } from "../Heading";

export function DataList<T extends DataListObject>({
  data,
  headers,
  loading = false,
  filterApplied = false,
  children,
  title,
  showCount = true,
  totalCount = 0,
}: DataListProps<T>) {
  const layout = getCompoundComponent<DataListLayoutProps<T>>(
    children,
    DataListLayout,
  )?.props.children;

  const elementData = generateListItemElements(data);
  const headerData = generateHeaderElements(headers);

  const showEmptyState = !loading && data.length === 0;
  const [isFilterApplied, setIsFilterApplied] = useState(filterApplied);
  const EmptyStateComponent = generateDataListEmptyState({
    children,
    isFilterApplied,
    setIsFilterApplied,
  });

  return (
    <div className={styles.wrapper}>
      {/* List title and counter */}
      <div className={styles.titleContainer}>
        {title && <Heading level={3}>{title}</Heading>}
        {showCount && (
          <div className={styles.results}>
            {loading ? (
              <Glimmer size="auto" shape="rectangle" />
            ) : (
              <Text>({totalCount} results)</Text>
            )}
          </div>
        )}
      </div>
      <div className={styles.header}>
        {/* Filters here, since it also sticks to the top */}
        {headerData && layout?.(headerData)}
      </div>
      {layout &&
        elementData.map((child, i) => (
          // TODO: Don't use index as key. Might have to force an ID on the data JOB-76773
          <div className={styles.listItem} key={i}>
            {layout(child)}
          </div>
        ))}
      {showEmptyState && EmptyStateComponent}
    </div>
  );
}

DataList.Layout = DataListLayout;
DataList.EmptyState = EmptyState;
