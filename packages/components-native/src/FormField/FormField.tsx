import React from "react";
import {
  ControllerRenderProps,
  FieldError,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { useFormController } from "../hooks";

interface FormFieldProps<T> {
  /**
   * name of the field
   */
  name: string;

  /**
   * The initial value of the form field.
   */
  readonly defaultValue?: T;

  /**
   * children to render
   */
  children: (
    field: ControllerRenderProps<FieldValues, string>,
    error?: FieldError,
  ) => React.ReactNode;

  /**
   * rules for returning an error when validations are violated
   */
  readonly validations?: RegisterOptions;
}

export function FormField<T>({
  name,
  children,
  defaultValue: value,
  validations,
}: FormFieldProps<T>): JSX.Element {
  const { error, field } = useFormController({
    name,
    value,
    validations,
  });

  return <>{children({ ...field }, error)}</>;
}
