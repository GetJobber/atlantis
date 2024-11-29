import { useMemo, useState } from "react";
import { InputText, Switch, Text } from "@jobber/components";
import { ValueStateInternals } from "../types/services";
import { ContentExport } from "../types/content";
import { SelectWithOptions } from "../components/SelectWithOptions";

/**
 * This is doing a few different things.
 *
 * 1. Any change to the PropList will call updateValue, which will update the values state.
 * 2. The stateValues are memoized to prevent re-renders and modified to the DataList format.
 * 3. Any value that is a straight function is converted to a real function so it can be used in the actual component.
 * 4. There are two utility functions that may move out of here:
 *   - isFunction: Checks if a string is a function
 *  - determineListComponent: Determines what component to use based on the type of the prop
 * @param meta Content Meta
 * @returns Values to be used on the ContentView page
 */
export const usePageValues = (meta: ContentExport) => {
  const [values, setValues] = useState(meta?.component.defaultProps);

  const updateValue = (key: string, value: string | number | boolean) => {
    if (key) {
      setValues(prev => ({
        ...prev,
        [key]: value as string,
      }));
    }
  };

  const stateValues = useMemo(() => {
    return meta?.props.map(propList => {
      return {
        name: propList.displayName,
        props: Object.keys(propList.props).map((key, index) => {
          const prop = propList.props[key];

          return {
            id: index,
            key,
            required: prop?.required ? "*" : "",
            description: prop?.description,
            component: determineListComponent({
              key,
              type: prop?.type.name || "",
              placeholder: key,
              value: "",
              updateValue,
            }),
          };
        }),
      };
    });
  }, [values]);

  const valuesWithFunctions: Record<
    string,
    string | number | boolean | undefined
  > = {};

  for (const i in values) {
    if (Object.hasOwnProperty.call(values, i)) {
      try {
        valuesWithFunctions[i] = isFunction(values[i] as string)
          ? // eslint-disable-next-line no-new-func
            new Function(`return ${values[i]}`)()
          : values[i];
      } catch (e) {
        // intentionally left empty. Errors here are because the user is still typing in their function in the props list
        // We can console log here, but it results in spam and it's 100% noise.
      }
    }
  }

  return {
    values,
    updateValue,
    stateValues,
    stateValueWithFunction:
      valuesWithFunctions as unknown as ValueStateInternals,
  };
};

const determineListComponent = ({
  key,
  type,
  value,
  placeholder,
  updateValue,
}: {
  key: string;
  type: string;
  value: string;
  placeholder: string;
  updateValue: (key: string, value: string | boolean) => void;
}) => {
  switch (type) {
    case "string": {
      return (
        <InputText
          placeholder={placeholder}
          value={value}
          onChange={val => updateValue(key, val as string)}
        />
      );
    }
    case "number": {
      return (
        <InputText
          placeholder={placeholder}
          value={value}
          onChange={val => updateValue(key, val as string)}
        />
      );
    }
    case "boolean": {
      return (
        <Switch
          value={Boolean(value)}
          onChange={val => {
            updateValue(key, val);
          }}
        />
      );
    }
  }

  if (isFunction(type)) {
    return (
      <InputText
        multiline
        placeholder={type}
        value={value?.toString()}
        onChange={val => {
          updateValue(key, val as string);
        }}
      />
    );
  }

  if (type.includes("|")) {
    const keys = type
      .replace(/"/g, "")
      .split("|")
      .map(d => d.trim());

    return (
      <SelectWithOptions
        value={value}
        keyIn={key}
        values={keys}
        updateValue={updateValue}
      />
    );
  }

  return <Text>{type}</Text>;
};

export const isFunction = (type: string) => {
  const regex = /\(([^)]*)\)\s*=>\s*([a-zA-Z_$][a-zA-Z0-9_$]*)/;
  const matches = type?.match?.(regex);

  return !!matches?.[0];
};
