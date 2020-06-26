import { useMemo, useState } from "react";
// Importing the polyfilled version of ResizeObserver
// eslint-disable-next-line import/no-internal-modules
import useResizeObserverPackage from "use-resize-observer/polyfilled";
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
