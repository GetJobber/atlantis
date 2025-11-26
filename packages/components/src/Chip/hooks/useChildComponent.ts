import type { ReactElement, ReactNode } from "react";
import React, { isValidElement, useMemo } from "react";

/**
 * Returns the first React Child that receives `true` from isCorrectComponent
 * @param children React Children
 * @param isCorrectComponent a function that accepts a ReactElement and returns a boolean.
 * @returns The first child component that returns true on isCorrectComponent
 */
export function useChildComponent(
  children: ReactNode | undefined,
  isCorrectComponent: (toCheck: ReactElement) => boolean,
) {
  return useMemo(() => {
    return React.Children.toArray(children).find(
      d => isValidElement(d) && isCorrectComponent(d as ReactElement),
    ) as ReactElement | undefined;
  }, [children]);
}
