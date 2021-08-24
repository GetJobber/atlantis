import React, { PropsWithChildren } from "react";
import classnames from "classnames";
import { FormFieldProps } from "./FormFieldTypes";
import styles from "./FormField.css";
import { InputValidation } from "../InputValidation";

interface FormFieldWrapperProps extends FormFieldProps {
  error: string;
  identifier: string;
}

export function FormFieldWrapper({
  align,
  placeholder,
  value,
  children,
  invalid,
  error,
  size,
  prefix,
  suffix,
  max,
  maxLength,
  type,
  disabled,
  inline,
  identifier,
}: PropsWithChildren<FormFieldWrapperProps>) {
  const wrapperClasses = classnames(
    styles.wrapper,
    size && styles[size],
    align && styles[align],
    {
      [styles.miniLabel]:
        (placeholder && value !== "") || (placeholder && type === "select"),
      [styles.textarea]: type === "textarea",
      [styles.invalid]: invalid ?? error,
      [styles.disabled]: disabled,
      [styles.inline]: inline,
      [styles.maxLength]: maxLength,
      [styles.select]: type === "select",
    },
  );

  const wrapperInlineStyle = {
    ["--formField-maxLength" as string]: maxLength || max,
  };

  return (
    <>
      <div className={wrapperClasses} style={wrapperInlineStyle}>
        {prefix?.icon && <div>Icon</div>}
        <div className={styles.inputWrapper}>
          {prefix?.label && <div>Prefix</div>}
          <label className={styles.label} htmlFor={identifier}>
            {placeholder}
          </label>
          {children}
          {suffix?.label && <div>Suffix</div>}
        </div>
        {suffix?.icon && <div>Icon</div>}
      </div>
      {error && !inline && <InputValidation message={error} />}
    </>
  );
}
