import React, { ChangeEvent, useId, useRef } from "react";
import { useTimePredict } from "./hooks/useTimePredict";
import { InputTimeProps, InputTimeRebuiltProps } from "./InputTime.types";
import { dateToTimeString, timeStringToDate } from "./utils/input-time-utils";
import { FormFieldWrapper, useFormFieldWrapperStyles } from "../FormField";

export function InputTimeRebuilt({
  value,
  onChange,
  ...params
}: InputTimeRebuiltProps) {
  const ref =
    (params.inputRef as React.RefObject<HTMLInputElement>) ??
    useRef<HTMLInputElement>(null);
  const { setTypedTime } = useTimePredict({
    value,
    handleChange,
  });

  const { inputStyle } = useFormFieldWrapperStyles(params);

  const id = getId(params);

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
      readonly={params.readonly}
      placeholder={params.placeholder}
      value={dateToTimeString(value)}
    >
      <input
        ref={ref}
        type="time"
        name={params.name}
        className={inputStyle}
        onBlur={handleBlur}
        disabled={params.disabled}
        readOnly={params.readonly}
        onChange={handleChangeEvent}
        onFocus={handleFocus}
        data-testid="ATL-InputTime-input"
        onKeyUp={e => {
          if (params.disabled || params.readonly) return;

          !isNaN(parseInt(e.key, 10)) && setTypedTime(prev => prev + e.key);
        }}
        value={dateToTimeString(value)}
      />
    </FormFieldWrapper>
  );

  function handleChangeEvent(event: ChangeEvent<HTMLInputElement>) {
    handleChange(event.target.value);
  }

  function handleChange(newValue: string) {
    onChange?.(timeStringToDate(newValue));
  }

  function handleBlur(event?: React.FocusEvent<HTMLInputElement>) {
    params.onBlur?.(event);

    if (ref.current) {
      if (!ref.current.checkValidity()) {
        ref.current.value = "";
      }
    }
  }

  function handleClear() {
    handleBlur();
    onChange?.(undefined);
    ref.current?.focus();
  }

  function handleFocus(event?: React.FocusEvent<HTMLInputElement>) {
    params.onFocus?.(event);
  }

  function getId(props: InputTimeProps) {
    const generatedId = useId();

    return props.id || generatedId;
  }
}
