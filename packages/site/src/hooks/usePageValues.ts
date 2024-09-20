import { useMemo, useState } from "react";
import { ValueStateInternal, ValueStateInternals } from "../types/services";

export const usePageValues = (
  generatedProps: Array<{ props: ValueStateInternals }>,
  defaultProps: Record<string, string | number | boolean | undefined>,
) => {
  const [values, setValues] =
    useState<Record<string, string | number | boolean | undefined>>(
      defaultProps,
    );

  const updateValue = (
    key: string,
    value: string | number | boolean | undefined,
  ) => {
    if (key) {
      setValues(prev => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const mergedValues = useMemo(() => {
    const mergedProps: Record<string, ValueStateInternal> = {};

    if (generatedProps) {
      Object.keys(generatedProps?.[0]?.props).map(key => {
        const prop = generatedProps?.[0].props[key];

        const extractedValue =
          typeof values[key] !== "undefined" ? values[key] : prop?.defaultValue;
        mergedProps[key] = {
          value: extractedValue as string,
          type: (typeof prop?.type !== "string" && prop?.type.name) || "",
          required: prop?.required || false,
          description: prop?.description || "",
        };
      });
    }

    return mergedProps;
  }, [generatedProps, values]);

  /**
   * This isn't nice.
   * We need to convert the functions in the values to actual functions so they're executable.
   * Do you know of a better way? Let's do that instead!
   */
  const valuesWithFunctions = useMemo(() => {
    const mergedProps: Record<string, string | undefined | number | boolean> = {
      ...values,
    };

    for (const key in mergedProps) {
      if (Object.hasOwn(mergedProps, key)) {
        let prop = mergedProps[key];

        if (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          typeof (prop as any).includes === "function" &&
          (prop as unknown as string)?.includes("(") &&
          (prop as unknown as string)?.includes("=>")
        ) {
          try {
            // eslint-disable-next-line no-new-func
            prop = new Function(`return (${prop})`)();
          } catch (e) {
            // eslint-disable-next-line no-new-func
            prop = new Function(`return (() => alert("${e}"))`)();
            console.log("e", e);
          }
        }

        mergedProps[key] = prop;
      }
    }

    return mergedProps;
  }, [values]);

  return {
    values: mergedValues,
    updateValue,
    stateValues: values,
    stateValueWithFunction:
      valuesWithFunctions as unknown as ValueStateInternals,
  };
};
