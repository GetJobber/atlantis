import React, { useId, useRef } from "react";
import omit from "lodash/omit";
import { SelectRebuiltProps } from "./Select.types";
import { useSelectActions } from "./hooks/useSelectActions";
import { useSelectFormField } from "./hooks/useSelectFormField";
import {
  FormFieldWrapper,
  useAtlantisFormFieldName,
  useFormFieldWrapperStyles,
} from "../FormField";
import { FormFieldPostFix } from "../FormField/FormFieldPostFix";

export function SelectRebuilt(props: SelectRebuiltProps) {
  const selectRef =
    (props.inputRef as React.RefObject<HTMLSelectElement>) ??
    useRef<HTMLSelectElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { inputStyle } = useFormFieldWrapperStyles({
    ...omit(props, ["version"]),
  });

  const id = useSelectId(props);

  const { name } = useAtlantisFormFieldName({
    nameProp: props.name,
    id: id,
  });

  const { handleChange, handleBlur, handleFocus } = useSelectActions({
    onChange: props.onChange,
    onBlur: props.onBlur,
    onFocus: props.onFocus,
  });

  const inputProps = omit(props, [
    "onChange",
    "onBlur",
    "onFocus",
    "size",
    "placeholder",
    "version",
  ]);

  const { fieldProps, descriptionIdentifier } = useSelectFormField({
    ...inputProps,
    id,
    name,
    handleChange,
    handleBlur,
    handleFocus,
  });

  return (
    <FormFieldWrapper
      disabled={props.disabled}
      size={props.size}
      align={props.align}
      inline={props.inline}
      autofocus={props.autofocus}
      name={name}
      wrapperRef={wrapperRef}
      error={props.error ?? ""}
      invalid={props.invalid}
      identifier={id}
      descriptionIdentifier={descriptionIdentifier}
      description={props.description}
      type="select"
      placeholder={props.placeholder}
      value={props.value}
      prefix={props.prefix}
      suffix={props.suffix}
      clearable="never"
      maxLength={props.maxLength}
    >
      <>
        <select {...fieldProps} ref={selectRef} className={inputStyle}>
          {props.children}
        </select>
        <FormFieldPostFix variation="select" />
      </>
    </FormFieldWrapper>
  );
}

function useSelectId(props: SelectRebuiltProps) {
  const generatedId = useId();

  return props.id || generatedId;
}
