import React, { forwardRef, useId, useRef } from "react";
import { useInputEmailActions } from "./hooks/useInputEmailActions";
import type { InputEmailRebuiltProps } from "./InputEmail.types";
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
  const generatedId = useId();
  const id = props.id || generatedId;
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

  const descriptionIdentifier = `descriptionUUID--${id}`;
  const hasDescription = props.description && !props.inline;
  const isInvalid = Boolean(props.error || props.invalid);

  return (
    <FormFieldWrapper
      error={props.error || ""}
      invalid={props.invalid}
      identifier={id}
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
        id={id}
        name={name}
        type="email"
        ref={inputRef}
        className={inputStyle}
        value={props.value}
        disabled={props.disabled}
        readOnly={props.readOnly}
        autoFocus={props.autoFocus}
        autoComplete={props.autoComplete}
        maxLength={props.maxLength}
        pattern={props.pattern}
        inputMode={props.inputMode}
        tabIndex={props.tabIndex}
        role={props.role}
        aria-label={props.ariaLabel}
        aria-describedby={
          hasDescription ? descriptionIdentifier : props.ariaDescribedBy
        }
        aria-invalid={isInvalid ? true : undefined}
        aria-controls={props.ariaControls}
        aria-expanded={props.ariaExpanded}
        aria-activedescendant={props.ariaActiveDescendant}
        aria-autocomplete={props.ariaAutocomplete}
        aria-required={props.ariaRequired}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onKeyUp={props.onKeyUp}
        data-testid="ATL-InputEmail-input"
      />
      <FormFieldPostFix variation="spinner" visible={props.loading ?? false} />
      {props.children}
    </FormFieldWrapper>
  );
});
