import React, { useEffect } from "react";
import { useInView } from "@jobber/hooks";
import styles from "./DataListLoadMore.module.css";
import { useDataListContext } from "../../context/DataListContext";
import { DATA_LOAD_MORE_TEST_ID } from "../../DataList.const";

export function DataListLoadMoreTrigger() {
  const { onLoadMore } = useDataListContext();
  const [inViewRef, isInView] = useInView<HTMLDivElement>();

  useEffect(() => {
    isInView && onLoadMore?.();
  }, [isInView]);

  return (
    <div
      ref={inViewRef}
      className={styles.trigger}
      data-testid={DATA_LOAD_MORE_TEST_ID}
    />
  );
}
