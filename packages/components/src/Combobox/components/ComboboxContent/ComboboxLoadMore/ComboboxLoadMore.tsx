import React, { useEffect } from "react";
import styles from "./ComboboxLoadMore.css";
import { useInView } from "../../../../hooks/useInView";

interface ComboboxLoadMoreProps {
  readonly onLoadMore: () => void;
}

export function ComboboxLoadMore({ onLoadMore }: ComboboxLoadMoreProps) {
  const [inViewRef, isInView] = useInView<HTMLDivElement>();

  useEffect(() => {
    isInView && onLoadMore();
  }, [isInView]);

  return (
    <div
      data-testid="ATL-Combobox-Loadmore-Trigger"
      ref={inViewRef}
      className={styles.trigger}
    />
  );
}
