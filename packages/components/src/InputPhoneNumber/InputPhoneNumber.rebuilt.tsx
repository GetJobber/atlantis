import React, { forwardRef, useId } from "react";
import classNames from "classnames";
import { MaskElement } from "./InputMask";
import { useInputMask } from "./useInputMask";
import styles from "./InputMask.module.css";
import {
  DEFAULT_PATTERN,
  InputPhoneNumberRebuiltProps,
} from "./InputPhoneNumber.types";
import { useInputPhoneActions } from "./hooks/useInputPhoneActions";
import { useInputPhoneFormField } from "./hooks/useInputPhoneFormField";
import {
  FormFieldWrapper,
  useAtlantisFormFieldName,
  useFormFieldWrapperStyles,
} from "../FormField";
import { FormFieldPostFix } from "../FormField/FormFieldPostFix";

export const InputPhoneNumberRebuilt = forwardRef(
  function InputPhoneNumberInternal(
    { pattern = DEFAULT_PATTERN, ...props }: InputPhoneNumberRebuiltProps,
    ref: React.Ref<HTMLInputElement>,
  ) {
    const inputPhoneNumberRef =
      (ref as React.RefObject<HTMLInputElement>) ??
      React.useRef<HTMLInputElement>(null);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const { inputStyle } = useFormFieldWrapperStyles({
      ...props,
      type: "tel",
    });
    const generatedId = useId();
    const id = props.id || generatedId;

    const { name } = useAtlantisFormFieldName({
      nameProp: props.name,
      id: id,
    });

    const {
      formattedValue,
      isMasking,
      placeholderMask,
      inputValue,
      maskedOnChange,
    } = useInputMask({
      value: props.value,
      pattern,
      strict: false,
      onChange: props.onChange,
    });

    const {
      handleChange,
      handleBlur,
      handleFocus,
      handleClear,
      handleKeyDown,
    } = useInputPhoneActions({
      onChange: maskedOnChange,
      onBlur: props.onBlur,
      onFocus: props.onFocus,
      onEnter: props.onEnter,
      inputRef: inputPhoneNumberRef,
    });

    const { fieldProps, descriptionIdentifier } = useInputPhoneFormField({
      id,
      name,
      handleChange,
      handleBlur,
      handleFocus,
      handleKeyDown,
      autofocus: props.autoFocus,
      disabled: props.disabled,
      readonly: props.readonly,
      invalid: props.invalid,
      error: props.error,
      description: props.description,
      inline: props.inline,
    });

    return (
      <FormFieldWrapper
        disabled={props.disabled}
        size={props.size}
        inline={props.inline}
        name={name}
        wrapperRef={wrapperRef}
        error={props.error ?? ""}
        invalid={Boolean(props.error || props.invalid)}
        identifier={id}
        descriptionIdentifier={descriptionIdentifier}
        description={props.description}
        clearable={props.clearable ?? "never"}
        onClear={handleClear}
        type={"tel"}
        placeholder={props.placeholder}
        value={formattedValue}
        prefix={props.prefix}
        suffix={props.suffix}
        readonly={props.readonly}
        loading={props.loading}
      >
        <input
          type="tel"
          {...fieldProps}
          ref={inputPhoneNumberRef}
          className={classNames(inputStyle, {
            [styles.emptyValue]: inputValue.length === 0 && pattern[0] === "(",
          })}
          value={formattedValue}
          readOnly={props.readonly}
        />
        <MaskElement
          isMasking={isMasking}
          formattedValue={formattedValue}
          placeholderMask={placeholderMask}
        />
        <FormFieldPostFix
          variation="spinner"
          visible={props.loading ?? false}
        />
      </FormFieldWrapper>
    );
  },
);
