import React, { useEffect } from "react";
import { useInView } from "@jobber/hooks/useInView";
import styles from "./ComboboxLoadMore.css";

interface ComboboxLoadMoreProps extends React.PropsWithChildren {
  readonly onLoadMore: () => void;
}

export function ComboboxLoadMore({ onLoadMore }: ComboboxLoadMoreProps) {
  const [inViewRef, isInView] = useInView<HTMLDivElement>();

  useEffect(() => {
    isInView && onLoadMore?.();
  }, [isInView]);

  return (
    <div
      data-testid="ATL-Combobox-Loadmore-Trigger"
      ref={inViewRef}
      className={styles.trigger}
    />
  );
}
