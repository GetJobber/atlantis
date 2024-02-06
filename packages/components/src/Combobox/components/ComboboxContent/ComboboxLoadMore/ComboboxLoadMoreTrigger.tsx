import React, { useEffect } from "react";
import { useInView } from "@jobber/hooks/useInView";
import styles from "./ComboboxLoadMore.css";

export function ComboboxLoadMoreTrigger({
  onLoadMore,
}: {
  readonly onLoadMore: () => void;
}) {
  const [inViewRef, isInView] = useInView<HTMLDivElement>();

  useEffect(() => {
    isInView && onLoadMore?.();
  }, [isInView]);

  return (
    <div
      data-testid="ATL-Loadmore-Trigger"
      ref={inViewRef}
      className={styles.trigger}
    />
  );
}
