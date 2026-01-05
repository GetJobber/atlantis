import React from "react";
import omit from "lodash/omit";
import type { SelectLegacyProps } from "./Select.types";
import type { FormFieldProps } from "../FormField";
import { FormField } from "../FormField";

export function Select(props: SelectLegacyProps) {
  const formFieldProps: FormFieldProps = omit(
    {
      ...props,
    },
    ["version"],
  );

  return <FormField type="select" {...formFieldProps} />;
}
