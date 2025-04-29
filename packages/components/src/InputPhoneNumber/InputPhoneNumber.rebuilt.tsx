import React, { useCallback, useId } from "react";
import { InputMaskProps, PhoneNumberMaskElement } from "./InputMask";
import { useInputMask } from "./useInputMask";
import styles from "./InputMask.module.css";
import {
  CommonFormFieldProps,
  FormFieldProps,
  FormFieldWrapper,
  useAtlantisFormFieldName,
  useFormFieldWrapperStyles,
} from "../FormField";
import { useInputTextFormField } from "../InputText/useInputTextFormField";
import { useInputTextActions } from "../InputText/useInputTextActions";

const DEFAULT_PATTERN = "(***) ***-****";

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
  pattern = DEFAULT_PATTERN,
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

  const {
    formattedValue,
    isMasking,
    placeholderMask,
    numericValue,
    handleInputChange,
  } = useInputMask({
    value: props.value,
    pattern,
    strict: false,
  });

  const handleMaskedChange = useCallback(
    (value: string) => {
      const maskedValue = handleInputChange(value);
      props.onChange(maskedValue);
    },
    [handleInputChange, props.onChange],
  );

  const { handleChange, handleBlur, handleFocus, handleKeyDown, handleClear } =
    useInputTextActions({
      onChange: handleMaskedChange,
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

  const cursorPosition =
    numericValue.length === 0 && pattern[0] === "("
      ? ` ${styles.cursorPosition}`
      : "";

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
      value={formattedValue}
      prefix={props.prefix}
      suffix={props.suffix}
      readonly={props.readonly}
    >
      <input
        type="tel"
        {...fieldProps}
        ref={inputPhoneNumberRef}
        className={`${inputStyle}${cursorPosition}`}
        style={{ backgroundColor: "transparent" }}
        value={formattedValue}
        readOnly={props.readonly}
      />
      <PhoneNumberMaskElement
        isMasking={isMasking}
        formattedValue={formattedValue}
        placeholderMask={placeholderMask}
      />
    </FormFieldWrapper>
  );
}
