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
