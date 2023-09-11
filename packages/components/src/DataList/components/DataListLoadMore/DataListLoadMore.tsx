import React, { useEffect } from "react";
import { useInView } from "@jobber/hooks/useInView";
import styles from "./DataListLoadMore.css";
import { useDataListContext } from "../../context/DataListContext";
import {
  DATA_LIST_LOADING_MORE_SPINNER_TEST_ID,
  DATA_LOAD_MORE_TEST_ID,
} from "../../DataList.const";
import { Spinner } from "../../../Spinner";
import { Button } from "../../../Button";

export function DataListLoadMore() {
  const { onLoadMore, loadingState } = useDataListContext();
  const [inViewRef, isInView] = useInView<HTMLDivElement>();
  const showBackToTop = loadingState !== "loadingMore";

  useEffect(() => {
    isInView && onLoadMore?.();
  }, [isInView]);

  return (
    <>
      <div
        ref={inViewRef}
        className={styles.trigger}
        data-testid={DATA_LOAD_MORE_TEST_ID}
      />

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
            onClick={() => alert("Go back to top")}
            size="small"
            variation="subtle"
          />
        </div>
      )}
    </>
  );
}
