import { useMemo, useState } from "react";
import { ValueState, ValueStateInternals } from "../types/services";

export const usePageValues = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generatedProps: any,
  defaultProps: ValueState,
) => {
  const [values, setValues] = useState<ValueState>(defaultProps);

  const updateValue = (key: string, value: ValueStateInternals) => {
    setValues(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const mergedValues = useMemo(() => {
    const mergedProps: ValueStateInternals = {};

    if (generatedProps) {
      Object.keys(generatedProps?.[0]?.props).map(key => {
        const prop = generatedProps?.[0].props[key];

        const extractedValue =
          typeof values[key] !== "undefined" ? values[key] : prop.defaultValue;
        mergedProps[key] = {
          value:
            typeof extractedValue?.value !== "undefined"
              ? extractedValue?.value
              : extractedValue,
          type: prop.type.name,
          required: prop.required,
          description: prop.description,
        };
      });
    }

    return mergedProps;
  }, [generatedProps, values]);

  const valuesWithFunctions = useMemo(() => {
    const mergedProps: ValueState = { ...values };

    for (const key in mergedProps) {
      if (Object.hasOwn(mergedProps, key)) {
        let prop = mergedProps[key];

        if (
          typeof prop?.includes === "function" &&
          prop?.includes("(") &&
          prop?.includes("=>")
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
    stateValueWithFunction: valuesWithFunctions,
  };
};
