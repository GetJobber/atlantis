import { useCallback, useLayoutEffect, useRef, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";

export function useResizeObserver() {
  const [entry, setEntry] = useState<ResizeObserverEntry>();
  const [node, setNode] = useState() as any;
  const observer = useRef<ResizeObserver>();
  const disconnect = useCallback(() => {
    const { current } = observer;
    current && current.disconnect();
  }, []);

  const observe = useCallback(() => {
    observer.current = new ResizeObserver(([entrance]) => setEntry(entrance));
    node && observer.current.observe(node);
  }, [node]);

  useLayoutEffect(() => {
    observe();
    return () => disconnect();
  }, [disconnect, observe]);

  const getContentRect = useCallback(() => {
    let width = 0;
    let height = 0;
    if (entry && entry.contentRect) {
      const { contentRect } = entry;
      width = contentRect && Math.round(contentRect.width);
      height = contentRect && Math.round(contentRect.height);
    }

    const result = {
      width,
      height,
    };

    return result;
  }, [entry]);

  return [setNode, getContentRect()] as const;
}
