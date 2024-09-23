import { useMemo, useState } from "react";
import { InputText, Switch, Text } from "@jobber/components";
import { ValueStateInternals } from "../types/services";
import { ContentExport } from "../types/content";
import { OptionInternal } from "../components/OptionInternal";

export const usePageValues = (meta: ContentExport) => {
  const [values, setValues] = useState<
    Record<string, string | number | boolean | undefined>
  >(meta.component.defaultProps);

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

  const stateValues = useMemo(() => {
    return meta.props.map(propList => {
      return {
        name: propList.displayName,
        props: Object.keys(propList.props).map((key, index) => {
          const prop = propList.props[key];

          return {
            id: index,
            key,
            required: prop.required ? "*" : "",
            description: prop.description,
            component: determineListComponent({
              key,
              type: prop.type.name,
              placeholder: key,
              value: values[key] as string,
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
      valuesWithFunctions[i] = isFunction(values[i] as string)
        ? // eslint-disable-next-line no-new-func
          new Function(`return ${values[i]}`)()
        : values[i];
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
      <OptionInternal
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
