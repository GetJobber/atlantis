import React from "react";
import styles from "./DataListTotalCount.css";
import { Text } from "../../../Text";
import { Glimmer } from "../../../Glimmer";

export const DATALIST_TOTALCOUNT_TEST_ID = "ATL-DataList-TotalCount";

interface DataListTotalCountProps {
  totalCount?: number | null;
  loading?: boolean;
}

export function DataListTotalCount({
  totalCount,
  loading,
}: DataListTotalCountProps) {
  if (totalCount === undefined) return null;
  let output = null;

  if (totalCount === null && loading) {
    output = <Glimmer size="auto" shape="rectangle" />;
  }

  if (typeof totalCount === "number") {
    output = (
      <Text variation="subdued">({totalCount.toLocaleString()} results)</Text>
    );
  }

  return (
    <div className={styles.results} data-testid={DATALIST_TOTALCOUNT_TEST_ID}>
      {output}
    </div>
  );
}
