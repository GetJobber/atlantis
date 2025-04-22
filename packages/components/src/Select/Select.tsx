import React from "react";
import omit from "lodash/omit";
import { SelectLegacyProps } from "./Select.types";
import { FormField, FormFieldProps } from "../FormField";

export function Select(props: SelectLegacyProps) {
  const formFieldProps: FormFieldProps = omit(
    {
      ...props,
    },
    ["version"],
  );

  return <FormField type="select" {...formFieldProps} />;
}
