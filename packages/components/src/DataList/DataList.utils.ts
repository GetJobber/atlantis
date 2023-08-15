import { Children, ReactElement, isValidElement } from "react";

export function getCompoundComponent<T>(
  children: ReactElement | ReactElement[],
  type: ReactElement<T>["type"],
): ReactElement<T> | undefined {
  const childrenArray = Children.toArray(children);
  const element = childrenArray.find(
    child => isValidElement(child) && child.type === type,
  );

  // Since we are sure that the element is a ReactElement based on the
  // `isValidElement` check, we can safely cast it.
  return element as ReactElement<T> | undefined;
}
