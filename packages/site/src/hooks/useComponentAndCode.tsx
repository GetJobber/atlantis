import { useMemo } from "react";
import reactElementToJSXString from "react-element-to-jsx-string";
import { ContentExport } from "../types/content";
import { ValueStateInternals } from "../types/services";

export const useComponentAndCode = (
  meta: ContentExport,
  stateValueWithFunction: ValueStateInternals,
) => {
  const Component = meta.component.element as undefined | (() => JSX.Element);
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
