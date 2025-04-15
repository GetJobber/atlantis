import React from "react";
import omit from "lodash/omit";
import { SelectProps } from "./Select.types";
import { FormField } from "../FormField";

export function Select(props: SelectProps) {
  const formFieldProps = omit(props, ["version"]);

  return <FormField type="select" {...formFieldProps} />;
}
