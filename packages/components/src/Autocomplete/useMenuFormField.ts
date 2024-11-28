import { useEffect } from "react";
import { useController, useForm, useFormContext } from "react-hook-form";
import isEqual from "lodash/isEqual";
import { AutocompleteProps } from "./Autocomplete.types";
import { Option } from "./Option";

export function useMenuFormField({
  nameProp,
  value,
  defaultValue,
  id,
  onChangeProp,
}: {
  nameProp?: string;
  id: string;
  value: AutocompleteProps["value"];
  defaultValue: AutocompleteProps["defaultValue"];
  onChangeProp?: (chosenOption?: Option) => void;
}) {
  const formContext = useFormContext();
  const form = useForm({ mode: "onTouched" });
  // If there isn't a Form Context being provided, get a form for this field.
  const { control, watch, getValues } = formContext ?? form;
  /**
   * Generate a name if one is not supplied, this is the name
   * that will be used for react-hook-form and not neccessarily
   * attached to the DOM
   */

  const name = nameProp ? nameProp : `generatedName--${id}`;
  const {
    field: { onChange: onControllerChange },
  } = useController({
    name,
    control,
    defaultValue: value ?? defaultValue ?? "",
  });

  useEffect(() => {
    const controllerValue = getValues(name);

    if (value !== undefined && !isEqual(value, controllerValue)) {
      onChangeProp?.(value);
      onControllerChange(value);
    }
  }, [value, watch(name)]);

  return { onControllerChange };
}
