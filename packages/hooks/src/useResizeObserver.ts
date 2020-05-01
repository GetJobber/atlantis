import {
  MutableRefObject,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import ResizeObserver from "resize-observer-polyfill";

export function useResizeObserver<T extends Element>() {
  const [entry, setEntry] = useState<ResizeObserverEntry>();
  const node = useRef() as MutableRefObject<T>;
  const observer = useRef<ResizeObserver>();
  const disconnect = useCallback(() => {
    const { current } = observer;
    current && current.disconnect();
  }, []);

  const observe = useCallback(() => {
    observer.current = new ResizeObserver(([entrance]) => setEntry(entrance));
    node.current && observer.current.observe(node.current);
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

  return [node, getContentRect()] as const;
}
