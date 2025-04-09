import React, { ChangeEvent, useId } from "react";
import { useTimePredict } from "./hooks/useTimePredict";
import { InputTimeProps, InputTimeRebuiltProps } from "./InputTime.Types";
import { dateToTimeString, timeStringToDate } from "./utils/input-time-utils";
import {
  FormFieldProps,
  FormFieldWrapper,
  useFormFieldWrapperStyles,
} from "../FormField";

export function InputTimeRebuilt({
  defaultValue,
  value,
  onChange,
  ...params
}: InputTimeRebuiltProps) {
  const { setTypedTime } = useTimePredict({
    value,
    handleChange,
  });
  console.log("version2");

  const { inputStyle } = useFormFieldWrapperStyles(params);

  const id = getId(params);
  const fieldProps = {
    onChange: handleChange,
    ...(defaultValue && {
      defaultValue: dateToTimeString(defaultValue),
    }),
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
        ref={params.inputRef as React.RefObject<HTMLInputElement>}
        type="time"
        className={inputStyle}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
      />
    </FormFieldWrapper>
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(timeStringToDate(event.target.value));
  }

  function handleBlur() {}

  function handleClear() {}

  function handleFocus() {}

  function getId(props: InputTimeProps) {
    const generatedId = useId();

    return props.id || generatedId;
  }
}
