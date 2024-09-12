import { ReactElement } from "react";

/**
 * A utility function to determine if a React element is of a specific type of React element.
 * @param component A React element to determine its type
 * @param type Component type to compare
 * @returns
 */
export function isComponentType<T>(
  component: ReactElement<unknown> | undefined,
  type: T,
): component is ReactElement<T> {
  return component?.type === type;
}
