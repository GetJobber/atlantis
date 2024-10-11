import { useMemo } from "react";
import reactElementToJSXString from "react-element-to-jsx-string";
import { ContentExport } from "../types/content";
import { ValueStateInternals } from "../types/services";

/**
 * Quick helper to take in the meta for a component and the state values with functions applied and return the component and code
 *
 * @param meta Full Meta Content Export layout
 * @param stateValueWithFunction The state values with functions applied
 * @returns {Component,code}
 */
export const useComponentAndCode = (
  meta: ContentExport,
  stateValueWithFunction: ValueStateInternals,
) => {
  const Component = meta?.component.element as undefined | (() => JSX.Element);
  const code = useMemo(() => {
    return Component && stateValueWithFunction
      ? reactElementToJSXString(<Component {...stateValueWithFunction} />, {
          showFunctions: true,
        })
      : "";
  }, [stateValueWithFunction]);

  return {
    Component,
    code,
  };
};
