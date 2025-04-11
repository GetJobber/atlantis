import React, { ChangeEvent, useId, useRef } from "react";
import { useTimePredict } from "./hooks/useTimePredict";
import { InputTimeProps, InputTimeRebuiltProps } from "./InputTime.Types";
import { dateToTimeString, timeStringToDate } from "./utils/input-time-utils";
import { FormFieldWrapper, useFormFieldWrapperStyles } from "../FormField";

export function InputTimeRebuilt({
  defaultValue,
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

  const valueProps = {
    ...(defaultValue && { defaultValue: dateToTimeString(defaultValue) }),
    ...(!defaultValue && { value: dateToTimeString(value) }),
  };

  return (
    <FormFieldWrapper
      disabled={params.disabled}
      size={params.size}
      align={params.align}
      inline={params.inline}
      name={params.name}
      error={""}
      identifier={id}
      descriptionIdentifier={`descriptionUUID--${id}`}
      invalid={Boolean(params.invalid)}
      description={params.description}
      clearable={params.clearable ?? "never"}
      onClear={handleClear}
      placeholder={params.placeholder}
      value={value}
    >
      <input
        ref={ref}
        type="time"
        name={params.name}
        className={inputStyle}
        onBlur={handleBlur}
        onChange={handleChangeEvent}
        onFocus={handleFocus}
        onKeyUp={e => {
          !isNaN(parseInt(e.key, 10)) && setTypedTime(prev => prev + e.key);
        }}
        {...valueProps}
      />
    </FormFieldWrapper>
  );

  function handleChangeEvent(event: ChangeEvent<HTMLInputElement>) {
    handleChange(event.target.value);
  }

  function handleChange(newValue: string) {
    onChange?.(timeStringToDate(newValue));
  }

  function handleBlur() {
    params.onBlur?.();

    if (ref.current) {
      if (!ref.current.checkValidity()) {
        // don't we need to update the value too?
        // is it valid for them to be out of sync?
        // onChange?.(undefined);
        ref.current.value = "";
      }
    }
  }

  function handleClear() {
    handleBlur();
    onChange?.(undefined);
    ref.current?.focus();
  }

  function handleFocus() {
    params.onFocus?.();
  }

  function getId(props: InputTimeProps) {
    const generatedId = useId();

    return props.id || generatedId;
  }
}
