import React, { useEffect } from "react";
import { useInView } from "@jobber/hooks";
import styles from "./ComboboxLoadMore.module.css";

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
