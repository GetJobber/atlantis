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
    const mergedProps: Record<string, ValueStateInternals> = {};
    Object.keys(generatedProps[0]?.props).map(key => {
      const prop = generatedProps[0].props[key];

      const extractedValue = defaultProps[key]
        ? defaultProps[key]
        : prop.defaultValue;
      mergedProps[key] = {
        value: extractedValue?.value ? extractedValue?.value : extractedValue,
        type: prop.type.name,
        required: prop.required,
        description: prop.description,
      };
    });

    return mergedProps;
  }, [generatedProps, defaultProps, values]);
  console.log("MERGEE", mergedValues);

  return { values: mergedValues, updateValue, stateValues: values };
};
