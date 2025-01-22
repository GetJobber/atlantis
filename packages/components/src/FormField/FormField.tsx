import React, { useId } from "react";
import { FormFieldProps } from "./FormFieldTypes";
import { FormFieldWrapper } from "./FormFieldWrapper";
import { FormFieldPostFix } from "./FormFieldPostFix";
import { useAtlantisFormFieldActions } from "./hooks/useAtlantisFormFieldActions";
import { useAtlantisFormField } from "./hooks/useAtlantisFormField";
import { useAtlantisFormFieldName } from "./hooks/useAtlantisFormFieldName";
import { useAtlantisReactHookForm } from "./hooks/useAtlantisReactHookForm";

export function FormField(props: FormFieldProps) {
  // Warning: do not move useId into FormFieldInternal. This must be here to avoid
  // a problem where useId isn't stable across multiple StrictMode renders.
  // https://github.com/facebook/react/issues/27103
  const generatedId = useId();
  const id = props.id || generatedId;

  return <FormFieldInternal {...props} id={id} />;
}

type FormFieldInternalProps = FormFieldProps & {
  readonly id: string;
};

function FormFieldInternal(props: FormFieldInternalProps) {
  const {
    actionsRef,
    autocomplete = true,
    children,
    defaultValue,
    description,
    disabled,
    id,
    inputRef,
    inline,
    keyboard,
    max,
    maxLength,
    min,
    name: nameProp,
    readonly,
    rows,
    loading,
    type = "text",
    validations,
    value,
    onChange,
    onEnter,
    onFocus,
    onBlur,
    onValidation,
    onKeyUp,
    clearable = "never",
    autofocus,
  } = props;

  const { name } = useAtlantisFormFieldName({ id, nameProp });

  const {
    errorMessage,
    inputRefs,
    useControllerField,
    setValue,
    onControllerBlur,
    onControllerChange,
  } = useAtlantisReactHookForm({
    actionsRef,
    name,
    defaultValue,
    value,
    validations,
    inputRef,
  });
  const {
    handleValidation,
    handleBlur,
    handleChange,
    handleClear,
    handleFocus,
    handleKeyDown,
  } = useAtlantisFormFieldActions({
    inputRef,
    onChange,
    onEnter,
    readonly,
    type,
    onFocus,
    setValue,
    onBlur,
    onValidation,
    onControllerBlur,
    onControllerChange,
    name,
  });

  const { textFieldProps, fieldProps, descriptionIdentifier } =
    useAtlantisFormField({
      id,
      useControllerField,
      name,
      nameProp,
      description,
      validations: !!validations,
      disabled,
      readonly,
      keyboard,
      autofocus,
      handleChange,
      handleBlur,
      handleFocus,
      inline,
      errorMessage,
      handleValidation,
      handleKeyDown,
    });

  return (
    <FormFieldWrapper
      {...props}
      value={useControllerField.value}
      error={errorMessage}
      identifier={id}
      descriptionIdentifier={descriptionIdentifier}
      clearable={clearable}
      onClear={handleClear}
    >
      {renderField()}
    </FormFieldWrapper>
  );

  function renderField() {
    switch (type) {
      case "select":
        return (
          <>
            <select {...fieldProps}>{children}</select>
            <FormFieldPostFix variation="select" />
          </>
        );
      case "textarea":
        return <textarea {...textFieldProps} rows={rows} ref={inputRefs} />;
      default:
        return (
          <>
            <input
              {...textFieldProps}
              autoComplete={setAutocomplete(autocomplete)}
              type={type}
              maxLength={maxLength}
              max={max}
              min={min}
              ref={inputRefs}
              onKeyUp={onKeyUp}
            />
            {loading && <FormFieldPostFix variation="spinner" />}
            {children}
          </>
        );
    }
  }
}

function setAutocomplete(
  autocompleteSetting: boolean | FormFieldProps["autocomplete"],
) {
  if (autocompleteSetting === true) {
    return undefined;
  } else if (autocompleteSetting === false) {
    return "off";
  }

  return autocompleteSetting;
}
