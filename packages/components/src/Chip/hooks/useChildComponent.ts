import React, { ReactNode, isValidElement, useMemo } from "react";

/**
 * Returns the first React Child that receives `true` from isCorrectComponent
 * @param children React Children
 * @param isCorrectComponent a function that accepts a JSX Element and returns a boolean.
 * @returns The first child component that returns true on isCorrectComponent
 */
export function useChildComponent(
  children: ReactNode | undefined,
  isCorrectComponent: (toCheck: JSX.Element) => boolean,
): JSX.Element | undefined {
  return useMemo(() => {
    return React.Children.toArray(children).find(
      d => isValidElement(d) && isCorrectComponent(d as JSX.Element),
    ) as JSX.Element;
  }, [children]);
}
