import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useEffect,
  useId,
  useImperativeHandle,
} from "react";
import { useController, useForm, useFormContext } from "react-hook-form";
import { FormFieldProps } from "./FormFieldTypes";
import styles from "./FormField.css";
import { FormFieldWrapper } from "./FormFieldWrapper";
import { FormFieldPostFix } from "./FormFieldPostFix";
import { mergeRefs } from "../utils/mergeRefs";

export function FormField(props: FormFieldProps) {
  // Warning: do not move useId into FormFieldInternal. This must be here to avoid
  // a problem where useId isn't stable across multiple StrictMode renders.
  // https://github.com/facebook/react/issues/27103
  const id = useId();

  return <FormFieldInternal {...props} id={id} />;
}

type FormFieldInternalProps = FormFieldProps & {
  readonly id: string;
};

// eslint-disable-next-line max-statements
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
  const formContext = useFormContext();
  // If there isn't a Form Context being provided, get a form for this field.
  const { control, setValue, watch } =
    formContext ?? useForm({ mode: "onTouched" });

  const descriptionIdentifier = `descriptionUUID--${id}`;
  /**
   * Generate a name if one is not supplied, this is the name
   * that will be used for react-hook-form and not neccessarily
   * attached to the DOM
   */
  const name = nameProp ? nameProp : `generatedName--${id}`;

  useEffect(() => {
    if (value != undefined) {
      setValue(name, value);
    }
  }, [value, watch(name)]);

  useImperativeHandle(actionsRef, () => ({
    setValue: newValue => {
      setValue(name, newValue, { shouldValidate: true });
    },
  }));

  const {
    field: {
      onChange: onControllerChange,
      onBlur: onControllerBlur,
      ref: fieldRef,
      ...rest
    },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: validations,
    defaultValue: value ?? defaultValue ?? "",
  });

  const errorMessage = error?.message || "";
  useEffect(() => handleValidation(errorMessage), [errorMessage]);

  const fieldProps = {
    ...rest,
    id,
    className: styles.input,
    name: (validations || nameProp) && name,
    disabled: disabled,
    readOnly: readonly,
    inputMode: keyboard,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    autoFocus: autofocus,
    ...(description &&
      !inline && { "aria-describedby": descriptionIdentifier }),
  };

  const textFieldProps = {
    ...fieldProps,
    autoFocus: autofocus,
    onKeyDown: handleKeyDown,
  };
  const inputRefs = mergeRefs([inputRef, fieldRef]);

  return (
    <FormFieldWrapper
      {...props}
      value={rest.value}
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

  function handleClear() {
    handleBlur();
    setValue(name, "", { shouldValidate: true });
    onChange && onChange("");
    inputRef?.current?.focus();
  }

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    let newValue: string | number;
    newValue = event.currentTarget.value;

    if (type === "number" && newValue.length > 0) {
      newValue = parseFloat(newValue);
    }

    onChange && onChange(newValue, event);
    onControllerChange(event);
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    if (!onEnter) return;
    if (event.key !== "Enter") return;
    if (event.shiftKey || event.ctrlKey) return;
    event.preventDefault();
    onEnter && onEnter(event);
  }

  function handleFocus(
    event: FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const target = event.currentTarget;

    if ((target as HTMLInputElement).select) {
      setTimeout(() => readonly && (target as HTMLInputElement).select());
    }

    onFocus && onFocus();
  }

  function handleBlur() {
    onBlur && onBlur();
    onControllerBlur();
  }

  function handleValidation(message: string) {
    onValidation && onValidation(message);
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
