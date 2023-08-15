import React from "react";
import styles from "./DataList.css";
import { Heading } from "../Heading";
import { Glimmer } from "../Glimmer";
import { Text } from "../Text";

interface DataListInterface {
  title?: string;
  showCount?: boolean;
  loading: boolean;
  items: string[];
}

export function DataList({
  title,
  showCount = true,
  loading,
  items,
}: DataListInterface) {
  return (
    <div className={styles.wrapper}>
      {title && (
        <DataListTitle
          title={title}
          showCount={showCount}
          count={items.length}
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
  count,
  loading,
}: {
  title?: string;
  showCount: boolean;
  count: number;
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
            <Text>({count} results)</Text>
          )}
        </div>
      )}
    </div>
  );
}
