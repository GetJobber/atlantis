import { useMemo, useState } from "react";
// Importing the polyfilled version of ResizeObserver
// eslint-disable-next-line import/no-internal-modules
import useResizeObserverPackage from "use-resize-observer/polyfilled";
import { throttle } from "lodash";

interface ObservedSize {
  width: number | undefined;
  height: number | undefined;
}

interface ResizeObserverProps {
  width?: object;
  height?: object;
}

const wait = 100;

export function useResizeObserver<T extends HTMLElement>(
  { width, height } = {} as ResizeObserverProps,
) {
  const [exactSize, setSize] = useState<ObservedSize>({
    width: undefined,
    height: undefined,
  });
  const onResize = useMemo(() => throttle(setSize, wait), [wait]);
  const { ref } = useResizeObserverPackage<T>({
    onResize,
  });

  const defaultSizes = {
    smaller: 265,
    small: 500,
    base: 640,
    large: 750,
    larger: 1024,
  };

  const exactWidth = exactSize.width;
  const exactHeight = exactSize.height;
  const sizes = {
    width: getSizeKey(width || defaultSizes, exactSize.width),
    height: getSizeKey(height || defaultSizes, exactSize.height),
    exactWidth,
    exactHeight,
  };

  return [ref, sizes] as const;
}

/**
 * To get the proper size we want to make sure that our value is greater
 * then the comparable, but less then the next largest number in our
 * object.
 */
function getSizeKey(sizes: object, comparable: number | undefined) {
  if (!comparable || !sizes) {
    return;
  }

  /**
   * Sort the values of our object so that we know they are in proper
   * order to be compared by
   */
  const values = Object.values(sizes)
    .sort((a, b) => a - b)
    .reverse();

  const consideredValues = values.filter(value => value <= comparable);
  const properSize = consideredValues[0] || Object.keys(sizes)[0];

  return Object.keys(sizes).find(
    key => sizes[key as keyof object] === properSize,
  );
}
