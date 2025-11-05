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
  const legacyPropHelper = {
    ...props,
    version: 1,
    max: typeof props.max === "string" ? parseFloat(props.max) : props.max,
  };

  const id = useInputTextId(props);

  const { rowRange } = useTextAreaResize({
    rows: props.rows,
    value: props.value,
    inputRef: inputTextRef,
    wrapperRef: wrapperRef,
  });

  const { inputStyle } = useFormFieldWrapperStyles(legacyPropHelper);

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
  const isInvalid = Boolean(
    props["aria-invalid"] || props.error || props.invalid,
  );

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
          <TextArea
            id={id}
            name={name}
            className={inputStyle}
            value={props.value}
            rows={rowRange.min}
            disabled={props.disabled}
            readOnly={props.readOnly}
            required={props.required}
            autoFocus={props.autoFocus}
            autoComplete={props.autoComplete}
            maxLength={props.maxLength}
            minLength={props.minLength}
            placeholder={props.placeholder}
            inputMode={props.inputMode}
            tabIndex={props.tabIndex}
            role={props.role}
            aria-label={props["aria-label"]}
            aria-describedby={
              hasDescription ? descriptionIdentifier : props["aria-describedby"]
            }
            aria-invalid={isInvalid ? true : undefined}
            aria-controls={props["aria-controls"]}
            aria-expanded={props["aria-expanded"]}
            aria-activedescendant={props["aria-activedescendant"]}
            aria-autocomplete={props["aria-autocomplete"]}
            aria-required={props["aria-required"]}
            invalid={isInvalid ? ("true" as const) : undefined}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            onKeyUp={props.onKeyUp}
            ref={mergeRefs([inputRefs, inputTextRef])}
          />
        ) : (
          <TextInput
            id={id}
            name={name}
            className={inputStyle}
            value={props.value}
            disabled={props.disabled}
            readOnly={props.readOnly}
            required={props.required}
            autoFocus={props.autoFocus}
            autoComplete={props.autoComplete}
            maxLength={props.maxLength}
            minLength={props.minLength}
            max={props.max}
            min={props.min}
            pattern={props.pattern}
            placeholder={props.placeholder}
            inputMode={props.inputMode}
            tabIndex={props.tabIndex}
            role={props.role}
            aria-label={props["aria-label"]}
            aria-describedby={
              hasDescription ? descriptionIdentifier : props["aria-describedby"]
            }
            aria-invalid={isInvalid ? true : undefined}
            aria-controls={props["aria-controls"]}
            aria-expanded={props["aria-expanded"]}
            aria-activedescendant={props["aria-activedescendant"]}
            aria-autocomplete={props["aria-autocomplete"]}
            aria-required={props["aria-required"]}
            invalid={isInvalid ? ("true" as const) : undefined}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            onKeyUp={props.onKeyUp}
            ref={mergeRefs([inputRefs, inputTextRef])}
          />
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

  return props.identifier || props.id || generatedId;
}

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly invalid?: "true";
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(props, ref) {
    return <textarea {...props} ref={ref} />;
  },
);

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  readonly invalid?: "true";
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(props, ref) {
    return <input {...props} ref={ref} />;
  },
);
