import React, { forwardRef, useId, useRef } from "react";
import { useInputEmailActions } from "./hooks/useInputEmailActions";
import { useInputEmailFormField } from "./hooks/useInputEmailFormField";
import { InputEmailRebuiltProps } from "./InputEmail.types";
import {
  FormFieldWrapper,
  useAtlantisFormFieldName,
  useFormFieldWrapperStyles,
} from "../FormField";
import { FormFieldPostFix } from "../FormField/FormFieldPostFix";

export const InputEmailRebuilt = forwardRef<
  HTMLInputElement,
  InputEmailRebuiltProps
>((props, ref) => {
  const id = useId();
  const inputRef =
    (ref as React.RefObject<HTMLInputElement>) ??
    useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { inputStyle } = useFormFieldWrapperStyles({
    size: props.size,
    inline: props.inline,
    align: props.align,
    type: "email",
    value: props.value,
    invalid: props.invalid,
    error: props.error,
    maxLength: props.maxLength,
    disabled: props.disabled,
  });

  const { name } = useAtlantisFormFieldName({
    nameProp: props.name,
    id,
  });

  const { handleChange, handleBlur, handleFocus, handleKeyDown, handleClear } =
    useInputEmailActions({
      onChange: props.onChange,
      onBlur: props.onBlur,
      onFocus: props.onFocus,
      onKeyDown: props.onKeyDown,
      onEnter: props.onEnter,
      inputRef,
    });

  const { fieldProps, descriptionIdentifier } = useInputEmailFormField({
    ...props,
    id,
    name,
    handleChange,
    handleBlur,
    handleFocus,
    handleKeyDown,
  });

  return (
    <FormFieldWrapper
      error={props.error || ""}
      invalid={props.invalid}
      identifier={props.identifier || id}
      descriptionIdentifier={descriptionIdentifier}
      size={props.size}
      inline={props.inline}
      align={props.align}
      toolbar={props.toolbar}
      toolbarVisibility={props.toolbarVisibility}
      prefix={props.prefix}
      suffix={props.suffix}
      description={props.description}
      clearable={props.clearable ?? "never"}
      onClear={handleClear}
      wrapperRef={wrapperRef}
      maxLength={props.maxLength}
      disabled={props.disabled}
      type="email"
      value={props.value}
    >
      <input
        {...fieldProps}
        ref={inputRef}
        type="email"
        className={inputStyle}
        value={props.value}
      />
      <FormFieldPostFix variation="spinner" visible={props.loading ?? false} />
      {props.children}
    </FormFieldWrapper>
  );
});

InputEmailRebuilt.displayName = "InputEmailRebuilt";
