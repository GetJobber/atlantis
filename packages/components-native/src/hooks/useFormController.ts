import { v1 } from "react-native-uuid";
import {
  FieldError,
  RegisterOptions,
  UseControllerReturn,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";
import { useState } from "react";

interface UseFormControllerProps<T> {
  name?: string;
  value?: T;
  validations?: RegisterOptions;
}

interface UseFormController {
  error?: FieldError;
  field: UseControllerReturn["field"];
}

// eslint-disable-next-line max-statements
export function useFormController<T>({
  name,
  value,
  validations,
}: UseFormControllerProps<T>): UseFormController {
  const fieldName = useControlName(name);

  const form = useForm<{ fieldName: T }>({
    mode: "onTouched",
    defaultValues: { [fieldName]: value },
  });
  const formContext = useFormContext();

  const {
    control,
    formState: { errors },
  } = formContext || form;

  const { field } = useController({
    name: fieldName,
    control,
    rules: validations,
    defaultValue: value || undefined,
  });

  // The naming convention established by react-hook-form for arrays of fields is, for example, "emails.0.description".
  // This corresponds to the structure of the error object, e.g. { emails: { 0: { description: "foobar" } } }
  // We assume here that fields will either follow this period-delimited three-part convention, or else that they are simple and indivisible (e.g. "city").
  // TODO: Add support for two-part identifiers (e.g. "property.province")
  const fieldIdentifiers = fieldName.split(".");
  let error: unknown;

  if (fieldIdentifiers.length === 3) {
    const [section, item, identifier] = fieldIdentifiers;
    const err = (errors[section] as never)?.[item];
    error = err?.[identifier];
  } else {
    error = errors[fieldName];
  }

  return { error: error as FieldError, field };
}

function useControlName(name?: string): UseControllerReturn["field"]["name"] {
  const [identifier] = useState(v1());
  const prefix = `generatedName--${identifier}`;

  return `${name || prefix}` as const;
}
