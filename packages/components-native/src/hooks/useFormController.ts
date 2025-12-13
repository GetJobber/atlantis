import { v1 } from "react-native-uuid";
import type {
  FieldError,
  RegisterOptions,
  UseControllerReturn,
} from "react-hook-form";
import { get, useController, useForm, useFormContext } from "react-hook-form";
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
    defaultValue: value ?? undefined,
  });

  // The naming convention established by react-hook-form for arrays of fields is, for example, "emails.0.description".
  // Preserve original behavior: only treat three-part names as nested paths.
  // For anything else, perform a flat lookup to avoid behavioral changes.
  const identifiers = fieldName.split(".");
  const error =
    identifiers.length === 3 ? get(errors, fieldName) : errors[fieldName];

  return { error, field };
}

function useControlName(name?: string): UseControllerReturn["field"]["name"] {
  const [identifier] = useState(v1());
  const prefix = `generatedName--${identifier}`;

  return `${name || prefix}` as const;
}
