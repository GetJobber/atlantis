import React from "react";
import styles from "./DataList.css";
import { Heading } from "../Heading";
import { Glimmer } from "../Glimmer";
import { Text } from "../Text";

interface DataListInterface {
  title?: string;
  showCount?: boolean;
  totalCount?: number;
  loading: boolean;
}

export function DataList({
  title,
  showCount = true,
  totalCount = 0,
  loading,
}: DataListInterface) {
  return (
    <div className={styles.wrapper}>
      {title && (
        <DataListTitle
          title={title}
          showCount={showCount}
          totalCount={totalCount}
          loading={loading}
        />
      )}
      {/* List header */}
      {/* List content */}
      {/* List empty state */}
    </div>
  );
}

function DataListTitle({
  title,
  showCount,
  totalCount,
  loading,
}: {
  title?: string;
  showCount?: boolean;
  totalCount?: number;
  loading: boolean;
}) {
  return (
    <div className={styles.titleContainer}>
      <Heading level={3}>{title}</Heading>
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
  );
}
