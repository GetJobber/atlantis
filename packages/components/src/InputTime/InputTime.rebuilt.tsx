import React, { forwardRef, useId, useRef } from "react";
import { useTimePredict } from "./hooks/useTimePredict";
import { useInputTimeActions } from "./hooks/useInputTimeActions";
import type { InputTimeRebuiltProps } from "./InputTime.types";
import { dateToTimeString } from "./utils/input-time-utils";
import { FormFieldWrapper, useFormFieldWrapperStyles } from "../FormField";
import { mergeRefs } from "../utils/mergeRefs";

export const InputTimeRebuilt = forwardRef<
  HTMLInputElement,
  InputTimeRebuiltProps
>(function InputTimeRebuilt(
  {
    value,
    onChange,
    readOnly,
    autoComplete,
    // Deprecated props
    inputRef: deprecatedInputRef,
    ...props
  },
  forwardedRef,
) {
  const internalRef = useRef<HTMLInputElement>(null);
  const mergedRef = mergeRefs<HTMLInputElement>([
    internalRef,
    deprecatedInputRef as React.RefObject<HTMLInputElement>,
    forwardedRef,
  ]);
  const id = props.id || useId();
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const { inputStyle } = useFormFieldWrapperStyles(props);

  const {
    handleChangeEvent,
    handleChange,
    handleBlur,
    handleClear,
    handleFocus,
    handleKeyDown,
  } = useInputTimeActions({
    onChange,
    value,
    readOnly,
    disabled: props.disabled,
    inputRef: internalRef,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
    onKeyDown: props.onKeyDown,
  });

  const { setTypedTime } = useTimePredict({
    value,
    handleChange,
  });

  // Kept outside the useInputTimeActions hook to avoid circular dependency via setTypedTime and handleChange
  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    props.onKeyUp?.(event);
    if (props.disabled || readOnly) return;

    !isNaN(parseInt(event.key, 10)) && setTypedTime(prev => prev + event.key);
  }

  const isInvalid = Boolean(props.error || props.invalid);

  return (
    <FormFieldWrapper
      disabled={props.disabled}
      size={props.size}
      align={props.align}
      inline={props.inline}
      name={props.name}
      error={props.error || ""}
      identifier={id}
      descriptionIdentifier={`descriptionUUID--${id}`}
      invalid={props.invalid}
      description={props.description}
      clearable={props.clearable ?? "never"}
      onClear={handleClear}
      type="time"
      readonly={readOnly}
      placeholder={props.placeholder}
      value={dateToTimeString(value)}
      wrapperRef={wrapperRef}
    >
      <input
        ref={mergedRef}
        type="time"
        name={props.name}
        className={inputStyle}
        id={id}
        disabled={props.disabled}
        readOnly={readOnly}
        autoComplete={autoComplete}
        max={props.max}
        min={props.min}
        value={dateToTimeString(value)}
        onChange={handleChangeEvent}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        data-testid="ATL-InputTime-input"
        aria-label={props["aria-label"]}
        aria-describedby={props["aria-describedby"]}
        aria-invalid={isInvalid ? true : undefined}
        aria-required={props["aria-required"]}
      />
    </FormFieldWrapper>
  );
});
