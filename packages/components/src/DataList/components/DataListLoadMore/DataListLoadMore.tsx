import React, { useEffect } from "react";
import { useInView } from "@jobber/hooks/useInView";
import { useDataListContext } from "../../context/DataListContext";

export function DataListLoadMore() {
  const { onLoadMore } = useDataListContext();
  const [inViewRef, isInView] = useInView<HTMLDivElement>();

  useEffect(() => {
    isInView && onLoadMore?.();
  }, [isInView]);

  return <div ref={inViewRef} />;
}
