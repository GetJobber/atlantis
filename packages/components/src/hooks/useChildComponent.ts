import React, { ReactNode, isValidElement, useMemo } from "react";

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
