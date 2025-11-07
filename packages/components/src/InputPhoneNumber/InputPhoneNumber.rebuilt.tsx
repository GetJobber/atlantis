import React, { forwardRef, useId } from "react";
import classNames from "classnames";
import { MaskElement } from "./InputMask";
import { useInputMask } from "./useInputMask";
import styles from "./InputMask.module.css";
import type { InputPhoneNumberRebuiltProps } from "./InputPhoneNumber.types";
import { DEFAULT_PATTERN } from "./InputPhoneNumber.types";
import { useInputPhoneActions } from "./hooks/useInputPhoneActions";
import {
  FormFieldWrapper,
  useAtlantisFormFieldName,
  useFormFieldWrapperStyles,
} from "../FormField";
import { FormFieldPostFix } from "../FormField/FormFieldPostFix";

export const InputPhoneNumberRebuilt = forwardRef(
  // eslint-disable-next-line max-statements
  function InputPhoneNumberInternal(
    { pattern = DEFAULT_PATTERN, ...props }: InputPhoneNumberRebuiltProps,
    ref: React.Ref<HTMLInputElement>,
  ) {
    const inputPhoneNumberRef =
      (ref as React.RefObject<HTMLInputElement>) ??
      React.useRef<HTMLInputElement>(null);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const { inputStyle } = useFormFieldWrapperStyles({
      size: props.size,
      align: props.align,
      placeholder: props.placeholder,
      value: props.value,
      invalid: props.invalid,
      error: props.error,
      maxLength: undefined, // v2: maxLength not used for width styling
      disabled: props.disabled,
      inline: props.inline,
      type: "tel",
    });
    const generatedId = useId();
    const id = props.identifier || props.id || generatedId;

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

    const descriptionIdentifier = `descriptionUUID--${id}`;
    const hasDescription = props.description && !props.inline;
    const isInvalid = Boolean(
      props["aria-invalid"] || props.error || props.invalid,
    );

    return (
      <FormFieldWrapper
        disabled={props.disabled}
        size={props.size}
        inline={props.inline}
        wrapperRef={wrapperRef}
        error={props.error ?? ""}
        invalid={Boolean(props.error || props.invalid)}
        identifier={id}
        descriptionIdentifier={descriptionIdentifier}
        description={props.description}
        clearable={props.clearable ?? "never"}
        onClear={handleClear}
        type="tel"
        placeholder={props.placeholder}
        value={formattedValue}
        prefix={props.prefix}
        suffix={props.suffix}
        readonly={props.readOnly}
        loading={props.loading}
      >
        <input
          id={id}
          name={name}
          type="tel"
          ref={inputPhoneNumberRef}
          className={classNames(inputStyle, {
            [styles.emptyValue]: inputValue.length === 0 && pattern[0] === "(",
          })}
          value={formattedValue}
          disabled={props.disabled}
          readOnly={props.readOnly}
          required={props.required}
          autoFocus={props.autoFocus}
          autoComplete={props.autoComplete}
          inputMode={props.inputMode}
          tabIndex={props.tabIndex}
          role={props.role}
          aria-label={props["aria-label"]}
          aria-describedby={
            hasDescription ? descriptionIdentifier : props["aria-describedby"]
          }
          aria-invalid={isInvalid ? true : undefined}
          aria-controls={props["aria-controls"]}
          aria-expanded={props["aria-expanded"]}
          aria-activedescendant={props["aria-activedescendant"]}
          aria-autocomplete={props["aria-autocomplete"]}
          aria-required={props["aria-required"]}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
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
