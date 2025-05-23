import React, { forwardRef, useId, useRef } from "react";
import omit from "lodash/omit";
import { useInputEmailActions } from "./hooks/useInputEmailActions";
import { useInputEmailFormField } from "./hooks/useInputEmailFormField";
import { InputEmailRebuiltProps } from "./InputEmail.types";
import {
  FormFieldWrapper,
  useAtlantisFormFieldName,
  useFormFieldWrapperStyles,
} from "../FormField";
import { FormFieldPostFix } from "../FormField/FormFieldPostFix";

export const InputEmailRebuilt = forwardRef(function InputEmailInternal(
  props: InputEmailRebuiltProps,
  ref: React.Ref<HTMLInputElement>,
) {
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
    placeholder: props.placeholder,
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

  const inputProps = omit(props, [
    "placeholder",
    "onChange",
    "onBlur",
    "onFocus",
    "onEnter",
    "size",
    "prefix",
    "suffix",
    "version",
  ]);

  const { fieldProps, descriptionIdentifier } = useInputEmailFormField({
    ...inputProps,
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
      placeholder={props.placeholder}
      autofocus={props.autoFocus}
      name={name}
    >
      <input
        {...fieldProps}
        ref={inputRef}
        type="email"
        className={inputStyle}
        value={props.value}
        data-testid="ATL-InputEmail-input"
      />
      <FormFieldPostFix variation="spinner" visible={props.loading ?? false} />
      {props.children}
    </FormFieldWrapper>
  );
});
