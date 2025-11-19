import React, { forwardRef, useId, useRef } from "react";
import { useTimePredict } from "./hooks/useTimePredict";
import { useInputTimeActions } from "./hooks/useInputTimeActions";
import type { InputTimeRebuiltProps } from "./InputTime.types";
import { dateToTimeString } from "./utils/input-time-utils";
import { FormFieldWrapper, useFormFieldWrapperStyles } from "../FormField";
import { mergeRefs } from "../utils/mergeRefs";
import { filterDataAttributes } from "../sharedHelpers/filterDataAttributes";

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
    disabled: params.disabled,
    inputRef: internalRef,
    onFocus: params.onFocus,
    onBlur: params.onBlur,
    onKeyDown: params.onKeyDown,
  });

  const { setTypedTime } = useTimePredict({
    value,
    handleChange,
  });

  // Kept outside the useInputTimeActions hook to avoid circular dependency via setTypedTime and handleChange
  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    params.onKeyUp?.(event);
    if (params.disabled || readOnly) return;

    !isNaN(parseInt(event.key, 10)) && setTypedTime(prev => prev + event.key);
  }

  const isInvalid = Boolean(params.error || params.invalid);
  const dataAttrs = filterDataAttributes(params);

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
      maxLength={params.maxLength}
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
        id={id}
        disabled={params.disabled}
        readOnly={readOnly}
        autoComplete={autoComplete}
        maxLength={params.maxLength}
        max={params.max}
        min={params.min}
        value={dateToTimeString(value)}
        onChange={handleChangeEvent}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        data-testid="ATL-InputTime-input"
        aria-label={params["aria-label"]}
        aria-describedby={params["aria-describedby"]}
        aria-invalid={isInvalid ? true : undefined}
        aria-required={params["aria-required"]}
        {...dataAttrs}
      />
    </FormFieldWrapper>
  );
});
