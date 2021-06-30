import React from "react";
import classnames from "classnames";
import { FormFieldProps } from "./FormFieldTypes";
import styles from "./FormField.css";

interface FieldWrapperProps extends FormFieldProps {
  readonly hasMiniLabel?: boolean;
  readonly error?: string;
}
export function FieldWrapper({
  align,
  inline,
  max,
  maxLength,
  size,
  disabled,
  hasMiniLabel,
  children,
  type,
  placeholder,
  invalid,
  error,
}: FieldWrapperProps) {
  const Wrapper = inline ? "span" : "div";

  const wrapperClassNames = classnames(
    styles.wrapper,
    inline && styles.inline,
    size && styles[size],
    align && styles[align],
    disabled && styles.disabled,
    maxLength && styles.maxLength,
    {
      [styles.miniLabel]:
        (hasMiniLabel || type === "time" || type === "select") && placeholder,
      [styles.invalid]: invalid || error,
    },
  );

  const wrapperInlineStyle = {
    ["--formField-maxLength" as string]: maxLength || max,
  };

  return (
    <Wrapper className={wrapperClassNames} style={wrapperInlineStyle}>
      {children}
    </Wrapper>
  );
}
