import React, { PropsWithChildren } from "react";
import styles from "./DataListTotalCount.module.css";
import { Text } from "../../../Text";
import { Glimmer } from "../../../Glimmer";

export const DATALIST_TOTALCOUNT_TEST_ID = "ATL-DataList-TotalCount";

interface DataListTotalCountProps {
  readonly totalCount?: number | null;
  readonly loading?: boolean;
}

function DataListTotalCountContainer({ children }: PropsWithChildren) {
  return (
    <div className={styles.results} data-testid={DATALIST_TOTALCOUNT_TEST_ID}>
      {children}
    </div>
  );
}

export function DataListTotalCount({
  totalCount,
  loading,
}: DataListTotalCountProps) {
  if (totalCount === null && loading) {
    return (
      <DataListTotalCountContainer>
        <Glimmer size="auto" shape="rectangle" />
      </DataListTotalCountContainer>
    );
  }

  if (typeof totalCount === "number") {
    return (
      <DataListTotalCountContainer>
        <Text variation="subdued">({totalCount.toLocaleString()} results)</Text>
      </DataListTotalCountContainer>
    );
  }

  return null;
}
