// import {
//   MutableRefObject,
//   useCallback,
//   useLayoutEffect,
//   useRef,
//   useState,
// } from "react";
// import ResizeObserver from "resize-observer-polyfill";
// import { debounce } from "lodash";

// export function useResizeObserver<T extends Element>() {
//   const [entry, setEntry] = useState<ResizeObserverEntry>();
//   const node = useRef() as MutableRefObject<T>;
//   const observer = useRef<ResizeObserver>();
//   const disconnect = useCallback(() => {
//     const { current } = observer;
//     current && current.disconnect();
//   }, []);

//   console.log("1");

//   const observe = useCallback(() => {
//     observer.current = debounce(
//       () =>
//         new ResizeObserver(([entrance]) => {
//           console.log("2");
//         setEntry(entrance);
//         }),
//       300,
//     );

//     node.current && observer.current.observe(node.current);
//   }, [node]);

//   useLayoutEffect(() => {
//     observe();
//     return () => disconnect();
//   }, [disconnect, observe]);

//   const getContentRect = useCallback(() => {
//     let width = 0;
//     let height = 0;
//     if (entry && entry.contentRect) {
//       const { contentRect } = entry;
//       width = contentRect && Math.round(contentRect.width);
//       height = contentRect && Math.round(contentRect.height);
//     }

//     const result = {
//       width,
//       height,
//     };

//     return result;
//   }, [entry]);

//   return [node, getContentRect()] as const;
// }

import { useMemo, useState } from "react";
import useResizeObserverPackage from "use-resize-observer";
import { throttle } from "lodash";

interface ObservedSize {
  width: number | undefined;
  height: number | undefined;
}

const wait = 100;

export function useResizeObserver<T extends HTMLElement>() {
  const [size, setSize] = useState<ObservedSize>({
    width: undefined,
    height: undefined,
  });
  const onResize = useMemo(() => throttle(setSize, wait), [wait]);
  const { ref } = useResizeObserverPackage<T>({
    onResize,
  });
  return [ref, size] as const;
}
