import React, { MutableRefObject } from "react";
import { FormFieldPureProps } from "./FormFieldTypes";
import { FormFieldWrapper } from "./FormFieldWrapper";
import { FormFieldPostFix } from "./FormFieldPostFix";
import { useFormFieldProps } from "./hooks/useFormFieldProps";

export function FormFieldPure(props: FormFieldPureProps) {
  const {
    identifier,
    descriptionIdentifier,
    fieldProps,
    textFieldProps,
    setAutocomplete,
    handleClear,
  } = useFormFieldProps(props);
  const { inputRef, rows, ...rest } = props;

  return (
    <FormFieldWrapper
      {...rest}
      defaultValue={props.value as string}
      error={props.message || ""}
      identifier={identifier}
      descriptionIdentifier={descriptionIdentifier}
      clearable={props.clearable || "never"}
      onClear={() => handleClear(props.onChange, inputRef)}
    >
      {renderField()}
    </FormFieldWrapper>
  );

  function renderField() {
    switch (props.type) {
      case "select":
        return (
          <>
            <select
              {...(fieldProps as React.DetailedHTMLProps<
                React.SelectHTMLAttributes<HTMLSelectElement>,
                HTMLSelectElement
              >)}
            >
              {props.children}
            </select>
            <FormFieldPostFix variation="select" />
          </>
        );
      case "textarea":
        return (
          <textarea
            {...(textFieldProps as React.DetailedHTMLProps<
              React.TextareaHTMLAttributes<HTMLTextAreaElement>,
              HTMLTextAreaElement
            >)}
            rows={rows}
            ref={props.inputRef as MutableRefObject<HTMLTextAreaElement>}
          />
        );
      default:
        return (
          <>
            <input
              {...(textFieldProps as React.DetailedHTMLProps<
                React.InputHTMLAttributes<HTMLInputElement>,
                HTMLInputElement
              >)}
              autoComplete={setAutocomplete(props.autocomplete)}
              type={props.type}
              maxLength={props.maxLength}
              max={props.max}
              min={props.min}
              ref={props.inputRef as MutableRefObject<HTMLInputElement>}
              onKeyUp={props.onKeyUp}
            />
            {props.loading && <FormFieldPostFix variation="spinner" />}
            {props.children}
          </>
        );
    }
  }
}
