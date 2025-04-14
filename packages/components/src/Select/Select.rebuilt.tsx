import React, { forwardRef, useId, useRef } from "react";
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
import { mergeRefs } from "../utils/mergeRefs";

/**
 * SelectRebuilt is a version of the Select component that doesn't rely on React Hook Form.
 * It extracts the selection logic into custom hooks.
 */
export const SelectRebuilt = forwardRef(function SelectInternal(
  props: SelectRebuiltProps,
  ref: React.Ref<HTMLSelectElement>,
) {
  const selectRef = useRef<HTMLSelectElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { inputStyle } = useFormFieldWrapperStyles({
    ...omit(props, ["version"]),
  });

  const id = useSelectId(props);

  const { name } = useAtlantisFormFieldName({
    nameProp: props.name,
    id: id,
  });

  const { handleChange, handleBlur, handleFocus, handleClear } =
    useSelectActions({
      onChange: props.onChange,
      onBlur: props.onBlur,
      onFocus: props.onFocus,
      selectRef: selectRef,
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
      autofocus={props.autoFocus}
      name={name}
      wrapperRef={wrapperRef}
      error={props.error ?? ""}
      invalid={Boolean(props.error || props.invalid)}
      identifier={id}
      descriptionIdentifier={descriptionIdentifier}
      description={props.description}
      clearable={props.clearable ?? "never"}
      onClear={handleClear}
      type="select"
      placeholder={props.placeholder}
      value={props.value}
      prefix={props.prefix}
      suffix={props.suffix}
    >
      <>
        <select
          {...fieldProps}
          ref={mergeRefs([ref, selectRef])}
          className={inputStyle}
        >
          {props.children}
        </select>
        <FormFieldPostFix variation="select" />
      </>
    </FormFieldWrapper>
  );
});

function useSelectId(props: SelectRebuiltProps) {
  const generatedId = useId();

  return props.id || generatedId;
}
