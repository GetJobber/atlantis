import React from "react";
import { SelectProps } from "./Select.types";
import { FormField } from "../FormField";

export function Select(props: SelectProps) {
  return <FormField type="select" {...props} />;
}
