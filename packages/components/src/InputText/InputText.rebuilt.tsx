import React, { forwardRef, useId } from "react";
import type { InputTextRebuiltProps } from "./InputText.types";
import { useTextAreaResize } from "./useTextAreaResize";
import { useInputTextActions } from "./useInputTextActions";
import {
  FormFieldWrapper,
  useAtlantisFormFieldName,
  useFormFieldWrapperStyles,
} from "../FormField";
import { FormFieldPostFix } from "../FormField/FormFieldPostFix";
import { mergeRefs } from "../utils/mergeRefs";

export const InputTextSPAR = forwardRef(function InputTextInternal(
  props: InputTextRebuiltProps,
  inputRefs: React.Ref<HTMLInputElement | HTMLTextAreaElement>,
) {
  const inputTextRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(
    null,
  );

  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const id = useInputTextId(props);

  const { rowRange } = useTextAreaResize({
    rows: props.rows,
    value: props.value,
    inputRef: inputTextRef,
    wrapperRef: wrapperRef,
  });

  const { inputStyle } = useFormFieldWrapperStyles({
    size: props.size,
    align: props.align,
    placeholder: props.placeholder,
    value: props.value,
    invalid: props.invalid,
    error: props.error,
    maxLength: props.maxLength,
    type: props.multiline ? "textarea" : "text",
    disabled: props.disabled,
    inline: props.inline,
  });

  const { name } = useAtlantisFormFieldName({
    nameProp: props.name,
    id: id,
  });

  const { handleChange, handleBlur, handleFocus, handleKeyDown, handleClear } =
    useInputTextActions({
      onChange: props.onChange,
      onBlur: props.onBlur,
      onFocus: props.onFocus,
      onKeyDown: props.onKeyDown,
      onEnter: props.onEnter,
      inputRef: inputTextRef,
    });

  const descriptionIdentifier = `descriptionUUID--${id}`;
  const hasDescription = props.description && !props.inline;
  const isInvalid = Boolean(props.ariaInvalid || props.error || props.invalid);

  // Shared props for both TextArea and TextInput
  const commonInputProps = {
    id,
    name,
    className: inputStyle,
    value: props.value,
    disabled: props.disabled,
    readOnly: props.readOnly,
    autoFocus: props.autoFocus,
    autoComplete: props.autoComplete,
    inputMode: props.inputMode,
    tabIndex: props.tabIndex,
    maxLength: props.maxLength,
    role: props.role,
    "aria-label": props.ariaLabel,
    "aria-describedby": hasDescription
      ? descriptionIdentifier
      : props.ariaDescribedBy,
    "aria-invalid": isInvalid ? true : undefined,
    "aria-controls": props.ariaControls,
    "aria-expanded": props.ariaExpanded,
    "aria-activedescendant": props.ariaActiveDescendant,
    "aria-autocomplete": props.ariaAutocomplete,
    "aria-required": props.ariaRequired,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    onKeyUp: props.onKeyUp,
    ref: mergeRefs([inputRefs, inputTextRef]),
  };

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
      maxLength={props.maxLength}
      onClear={handleClear}
      type={props.multiline ? "textarea" : "text"}
      placeholder={props.placeholder}
      value={props.value}
      prefix={props.prefix}
      suffix={props.suffix}
      rows={rowRange.min}
      toolbar={props.toolbar}
      toolbarVisibility={props.toolbarVisibility}
    >
      <>
        {props.multiline ? (
          <TextArea {...commonInputProps} rows={rowRange.min} />
        ) : (
          <TextInput {...commonInputProps} pattern={props.pattern} />
        )}
        <FormFieldPostFix
          variation="spinner"
          visible={props.loading ?? false}
        />
        {props.children}
      </>
    </FormFieldWrapper>
  );
});

function useInputTextId(props: InputTextRebuiltProps) {
  const generatedId = useId();

  return props.id || generatedId;
}

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(props, ref) {
    return <textarea {...props} ref={ref} />;
  },
);

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(props, ref) {
    return <input {...props} ref={ref} />;
  },
);
