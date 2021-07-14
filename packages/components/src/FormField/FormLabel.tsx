import React from "react";
import classnames from "classnames";
import { FormFieldProps } from "./FormFieldTypes";
import styles from "./FormField.css";

interface FormLabelProps extends FormFieldProps {
  readonly identifier: string;
}

export function FormLabel({ placeholder, identifier, type }: FormLabelProps) {
  const labelClassNames = classnames(
    styles.label,
    type === "textarea" && styles.textareaLabel,
  );

  return (
    <label htmlFor={identifier} className={labelClassNames}>
      {placeholder}
    </label>
  );
}
