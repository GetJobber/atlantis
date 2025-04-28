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
>(
  (
    {
      error,
      invalid,
      identifier,
      autocomplete,
      loading,
      onKeyDown,
      children,
      onChange,
      onEnter,
      onBlur,
      onFocus,
      value,
      maxLength,
      size,
      inline,
      align,
      toolbar,
      toolbarVisibility,
      prefix,
      suffix,
      description,
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const { inputStyle } = useFormFieldWrapperStyles({
      size,
      inline,
      align,
      type: "text",
      value,
      invalid,
      error,
      maxLength,
      disabled: props.disabled,
    });

    const { name } = useAtlantisFormFieldName({
      nameProp: props.name,
      id,
    });

    const {
      handleChange,
      handleBlur,
      handleFocus,
      handleKeyDown,
      handleClear,
    } = useInputEmailActions({
      onChange,
      onBlur,
      onFocus,
      onKeyDown,
      onEnter,
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
        error={error || ""}
        invalid={invalid}
        identifier={identifier || id}
        descriptionIdentifier={descriptionIdentifier}
        size={size}
        inline={inline}
        align={align}
        toolbar={toolbar}
        toolbarVisibility={toolbarVisibility}
        prefix={prefix}
        suffix={suffix}
        description={description}
        clearable={props.clearable ?? "never"}
        onClear={handleClear}
        wrapperRef={wrapperRef}
        maxLength={maxLength}
        disabled={props.disabled}
        type="text"
        value={value}
      >
        <input
          {...fieldProps}
          ref={ref || inputRef}
          type="email"
          className={inputStyle}
          value={value}
          autoComplete={autocomplete === true ? "email" : autocomplete || "off"}
          aria-invalid={invalid}
          aria-describedby={error ? `${identifier || id}-error` : undefined}
        />
        <FormFieldPostFix variation="spinner" visible={loading ?? false} />
        {children}
      </FormFieldWrapper>
    );
  },
);

InputEmailRebuilt.displayName = "InputEmailRebuilt";
