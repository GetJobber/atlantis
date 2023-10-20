import { useMemo, useState } from "react";
// Importing the polyfilled version of ResizeObserver
// eslint-disable-next-line import/no-internal-modules
import useResizeObserverPackage from "use-resize-observer/polyfilled";
import throttle from "lodash/throttle";

export const Breakpoints = {
  base: 640,
  small: 500,
  smaller: 265,
  large: 750,
  larger: 1024,
};

interface ObservedSize {
  width: number | undefined;
  height: number | undefined;
}

interface ResizeObserverProps<T extends HTMLElement> {
  widths?: object;
  heights?: object;
  ref?: React.RefObject<T>;
}

const wait = 100;

export function useResizeObserver<T extends HTMLElement>({
  widths = Breakpoints,
  heights = Breakpoints,
  ref: refObject,
}: ResizeObserverProps<T> = {}) {
  const [exactSize, setSize] = useState<ObservedSize>({
    width: undefined,
    height: undefined,
  });
  const onResize = useMemo(() => throttle(setSize, wait), [wait]);
  const { ref } = useResizeObserverPackage<T>({
    ...(refObject && { ref: refObject }),
    onResize,
  });

  const exactWidth = exactSize.width;
  const exactHeight = exactSize.height;

  const sizes = {
    width: getSize(widths, exactSize.width),
    height: getSize(heights, exactSize.height),
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
function getSize(
  sizes: object,
  comparable: number | undefined,
): number | undefined {
  if (!comparable || !sizes) {
    return undefined;
  }

  /**
   * Sort the values of our object so that we know they are in proper
   * order to be compared by
   */
  const sortedSizes = Object.values(sizes)
    .sort((a, b) => a - b)
    .reverse();

  return (
    sortedSizes.find(value => value <= comparable) ||
    sortedSizes[sortedSizes.length - 1]
  );
}
