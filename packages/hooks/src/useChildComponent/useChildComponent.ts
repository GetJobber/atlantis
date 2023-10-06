import React, { ReactNode, useMemo } from "react";

export function useChildComponent(
  children: ReactNode | undefined,
  isCorrectComponent: (toCheck: JSX.Element) => boolean,
): JSX.Element | undefined {
  return useMemo(() => {
    let foundChildComponent;
    React.Children.forEach(children, d => {
      if (
        typeof d !== "undefined" &&
        typeof d !== "string" &&
        typeof d !== "number" &&
        typeof d !== "boolean" &&
        isCorrectComponent(d as JSX.Element)
      ) {
        foundChildComponent = d;
      }
    });
    return foundChildComponent;
  }, [children]);
}
