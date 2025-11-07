import type { ChangeEvent } from "react";
import React, { forwardRef, useId, useRef } from "react";
import { useTimePredict } from "./hooks/useTimePredict";
import type { InputTimeRebuiltProps } from "./InputTime.types";
import { dateToTimeString, timeStringToDate } from "./utils/input-time-utils";
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
    ...params
  },
  forwardedRef,
) {
  const internalRef = useRef<HTMLInputElement>(null);
  const mergedRef = mergeRefs<HTMLInputElement>([
    internalRef,
    deprecatedInputRef as React.RefObject<HTMLInputElement>,
    forwardedRef,
  ]);
  const id = params.id || useId();
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const { inputStyle } = useFormFieldWrapperStyles(params);
  const { setTypedTime } = useTimePredict({
    value,
    handleChange,
  });

  return (
    <FormFieldWrapper
      disabled={params.disabled}
      size={params.size}
      align={params.align}
      inline={params.inline}
      name={params.name}
      error={params.error || ""}
      identifier={id}
      descriptionIdentifier={`descriptionUUID--${id}`}
      invalid={Boolean(params.invalid)}
      description={params.description}
      clearable={params.clearable ?? "never"}
      onClear={handleClear}
      type="time"
      readonly={readOnly}
      placeholder={params.placeholder}
      value={dateToTimeString(value)}
      wrapperRef={wrapperRef}
    >
      <input
        ref={mergedRef}
        type="time"
        name={params.name}
        className={inputStyle}
        onBlur={handleBlur}
        id={id}
        disabled={params.disabled}
        readOnly={readOnly}
        autoComplete={autoComplete}
        onChange={handleChangeEvent}
        onFocus={handleFocus}
        onKeyDown={params.onKeyDown}
        onKeyUp={e => {
          params.onKeyUp?.(e);
          if (params.disabled || readOnly) return;

          !isNaN(parseInt(e.key, 10)) && setTypedTime(prev => prev + e.key);
        }}
        data-testid="ATL-InputTime-input"
        value={dateToTimeString(value)}
        aria-label={params["aria-label"]}
        aria-describedby={params["aria-describedby"]}
        aria-invalid={params["aria-invalid"]}
        aria-required={params["aria-required"]}
      />
    </FormFieldWrapper>
  );

  function handleChangeEvent(event: ChangeEvent<HTMLInputElement>) {
    handleChange(event.target.value);
  }

  function handleChange(newValue: string) {
    onChange?.(timeStringToDate(newValue, value));
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    params.onBlur?.(event);

    if (internalRef.current) {
      if (!internalRef.current.checkValidity()) {
        internalRef.current.value = "";
      }
    }
  }

  function handleClear() {
    // Clear the value and refocus without triggering blur event
    onChange?.(undefined);
    internalRef.current?.focus();
  }

  function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    params.onFocus?.(event);
  }
});
