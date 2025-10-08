import React from "react";
import type {
  ControllerRenderProps,
  FieldError,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { useFormController } from "../hooks";

interface FormFieldProps<T> {
  /**
   * Name of the field.
   */
  readonly name: string;

  /**
   * The initial value of the form field.
   */
  readonly defaultValue?: T;

  /**
   * Children to render.
   */
  readonly children: (
    field: ControllerRenderProps<FieldValues, string>,
    error?: FieldError,
  ) => React.ReactNode;

  /**
   * Rules for returning an error when validations are violated.
   * WARNING: This component needs to be nested inside a FormProvider
   *   for validations to work.
   */
  readonly validations?: RegisterOptions;
}

export function FormField<T>({
  name,
  children,
  defaultValue: value,
  validations,
}: FormFieldProps<T>): React.JSX.Element {
  const { error, field } = useFormController({
    name,
    value,
    validations,
  });

  return <>{children({ ...field }, error)}</>;
}
