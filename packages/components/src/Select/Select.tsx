import React from "react";
import omit from "lodash/omit";
import { SelectProps } from "./Select.types";
import { FormField, FormFieldProps } from "../FormField";

export function Select(props: SelectProps) {
  const formFieldProps: FormFieldProps = omit(
    {
      onChange: handleChange,
      ...props,
    },
    ["version"],
  );

  function handleChange(newValue: string | number) {
    props.onChange?.(newValue);
  }

  return <FormField type="select" {...formFieldProps} />;
}
