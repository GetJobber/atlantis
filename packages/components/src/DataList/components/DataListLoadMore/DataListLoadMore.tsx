import React from "react";
import styles from "./DataListLoadMore.css";
import { DataListLoadMoreTrigger } from "./DataListLoadMoreTrigger";
import { useDataListContext } from "../../context/DataListContext";
import { DATA_LIST_LOADING_MORE_SPINNER_TEST_ID } from "../../DataList.const";
import { Spinner } from "../../../Spinner";
import { Button } from "../../../Button";

interface DataListLoadMoreProps {
  readonly onBackToTop: () => void;
}

export const MAX_DATA_COUNT = 50;

export function DataListLoadMore({ onBackToTop }: DataListLoadMoreProps) {
  const { loadingState, data } = useDataListContext();
  const showBackToTop =
    data.length > MAX_DATA_COUNT && loadingState !== "loadingMore";

  return (
    <>
      <DataListLoadMoreTrigger key={data.length} />

      {loadingState === "loadingMore" && (
        <div
          data-testid={DATA_LIST_LOADING_MORE_SPINNER_TEST_ID}
          className={styles.loadingMore}
        >
          <Spinner size="small" />
        </div>
      )}

      {showBackToTop && (
        <div className={styles.backToTop}>
          <Button
            label="Back to top"
            onClick={onBackToTop}
            size="small"
            variation="subtle"
          />
        </div>
      )}
    </>
  );
}
