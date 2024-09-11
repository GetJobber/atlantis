import { useMemo, useState } from "react";
import { ValueState, ValueStateInternals } from "../types/services";

export const usePageValues = (defaultProps: ValueState) => {
  const [values, setValues] = useState<ValueState>(defaultProps);

  const updateValue = (
    propKey: string,
    key: { key: string },
    value: string | (() => void),
  ) => {
    setValues(oldValues => {
      const newValues: ValueState = {
        ...oldValues,
      };

      if (!newValues[propKey]) {
        newValues[propKey] = {};
      }
      newValues[propKey][key.key] = value;

      return newValues;
    });
  };
  const mappedProps = useMemo(() => {
    const mapped: ValueStateInternals = {};

    for (const key in values) {
      if (!Object.hasOwn(values, key)) {
        for (const propKey in values[key]) {
          if (Object.hasOwn(values[key], propKey)) {
            mapped[propKey] = values[key][propKey];
          }
        }
      }
    }

    return mapped;
  }, [values]);

  return { values, updateValue, mappedProps };
};
