import React, { useId } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { InputMask, InputMaskProps } from "./InputMask";
import {
  CommonFormFieldProps,
  FormField,
  FormFieldProps,
  FormFieldWrapper,
  useAtlantisFormFieldName,
  useFormFieldWrapperStyles,
} from "../FormField";
import { useInputTextFormField } from "../InputText/useInputTextFormField";
import { useInputTextActions } from "../InputText/useInputTextActions";

interface InputPhoneNumberRebuiltProps
  extends Omit<CommonFormFieldProps, "align">,
    Pick<
      FormFieldProps,
      | "autocomplete"
      | "onEnter"
      | "onFocus"
      | "onBlur"
      | "validations"
      | "readonly"
      | "prefix"
      | "suffix"
    > {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly error?: string;

  /**
   * A pattern to specify the format to display the phone number in.
   * For example if you want to display the format for [Denmark](https://en.wikipedia.org/wiki/National_conventions_for_writing_telephone_numbers#Denmark)
   * you could set it to `** ** ** **`
   * @default "(***) ***-****"
   */
  readonly pattern?: InputMaskProps["pattern"];
}

export function InputPhoneNumberRebuilt({
  ...props
}: InputPhoneNumberRebuiltProps) {
  const inputPhoneNumberRef = React.useRef<HTMLInputElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const { inputStyle } = useFormFieldWrapperStyles(props);

  const generatedId = useId();
  const id = props.id || generatedId;

  const { name } = useAtlantisFormFieldName({
    nameProp: props.name,
    id: id,
  });

  const { handleChange, handleBlur, handleFocus, handleKeyDown, handleClear } =
    useInputTextActions({
      onChange: props.onChange,
      onBlur: props.onBlur,
      onFocus: props.onFocus,
      onEnter: props.onEnter,
      inputRef: inputPhoneNumberRef,
    });

  const { fieldProps, descriptionIdentifier } = useInputTextFormField({
    id,
    name,
    handleChange,
    handleBlur,
    handleFocus,
    handleKeyDown,
  });

  return (
    <FormFieldWrapper
      disabled={props.disabled}
      size={props.size}
      inline={props.inline}
      name={name}
      wrapperRef={wrapperRef}
      error={props.error ?? ""}
      invalid={Boolean(props.error || props.invalid)}
      identifier={id}
      descriptionIdentifier={descriptionIdentifier}
      description={props.description}
      clearable={props.clearable ?? "never"}
      onClear={handleClear}
      type={"tel"}
      placeholder={props.placeholder}
      value={props.value}
      prefix={props.prefix}
      suffix={props.suffix}
      readonly={props.readonly}
    >
      <input
        type="tel"
        {...fieldProps}
        ref={inputPhoneNumberRef}
        className={inputStyle}
        value={props.value}
        readOnly={props.readonly}
      />
    </FormFieldWrapper>
  );
}
