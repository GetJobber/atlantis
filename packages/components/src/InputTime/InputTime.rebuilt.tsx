import React, { useId, useRef } from "react";
import { useTimePredict } from "./hooks/useTimePredict";
import { useInputTimeActions } from "./hooks/useInputTimeActions";
import type { InputTimeRebuiltProps } from "./InputTime.types";
import { dateToTimeString } from "./utils/input-time-utils";
import { FormFieldWrapper, useFormFieldWrapperStyles } from "../FormField";
import { mergeRefs } from "../utils/mergeRefs";

export function InputTimeRebuilt({
  value,
  onChange,
  readOnly,
  autoComplete,
  inputRef,
  ...props
}: InputTimeRebuiltProps) {
  const { internalRef, mergedRef, wrapperRef } = useInputTimeRefs(inputRef);
  const generatedId = useId();
  const id = props.id || generatedId;
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

  const descriptionIdentifier = `descriptionUUID--${id}`;
  const descriptionVisible = props.description && !props.inline;
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
      descriptionIdentifier={descriptionIdentifier}
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
        autoFocus={props.autoFocus}
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
        aria-describedby={
          descriptionVisible ? descriptionIdentifier : props["aria-describedby"]
        }
        aria-invalid={isInvalid ? true : undefined}
        aria-required={props["aria-required"]}
      />
    </FormFieldWrapper>
  );
}

function useInputTimeRefs(
  inputRef?: React.RefObject<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null
  >,
) {
  const internalRef = useRef<HTMLInputElement>(null);
  const mergedRef = mergeRefs<HTMLInputElement>([
    internalRef,
    inputRef as React.RefObject<HTMLInputElement>,
  ]);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  return { internalRef, mergedRef, wrapperRef };
}
