import React, { useEffect } from "react";
import { useInView } from "@jobber/hooks/useInView";
import styles from "./LoadMoreTrigger.module.css";

interface LoadMoreTriggerProps {
  readonly onLoadMore: () => void;
  readonly testId?: string;
}

export const LOAD_MORE_TEST_ID = "ATL-LoadMore-Trigger";

export function LoadMoreTrigger({ onLoadMore, testId }: LoadMoreTriggerProps) {
  const [inViewRef, isInView] = useInView<HTMLDivElement>();

  useEffect(() => {
    isInView && onLoadMore();
  }, [isInView]);

  return (
    <div
      ref={inViewRef}
      className={styles.trigger}
      data-testid={testId || LOAD_MORE_TEST_ID}
    />
  );
}
