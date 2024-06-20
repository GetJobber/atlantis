import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MutableRefObject,
  useEffect,
  useId,
  useImperativeHandle,
  useState,
} from "react";
import {
  Controller,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";
import { FormFieldProps } from "./FormFieldTypes";
import styles from "./FormField.css";
import { FormFieldWrapper } from "./FormFieldWrapper";
import { FormFieldPostFix } from "./FormFieldPostFix";

export function FormField(props: FormFieldProps) {
  const {
    actionsRef,
    autocomplete = true,
    children,
    defaultValue,
    description,
    disabled,
    inputRef,
    inline,
    keyboard,
    max,
    maxLength,
    min,
    name,
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

  const { control, setValue, watch } =
    useFormContext() != undefined
      ? useFormContext()
      : // If there isn't a Form Context being provided, get a form for this field.
        useForm({ mode: "onTouched" });

  const [identifier] = useState(useId());
  const [descriptionIdentifier] = useState(`descriptionUUID--${useId()}`);
  /**
   * Generate a name if one is not supplied, this is the name
   * that will be used for react-hook-form and not neccessarily
   * attached to the DOM
   */
  const [controlledName] = useState(
    name ? name : `generatedName--${identifier}`,
  );

  useEffect(() => {
    if (value != undefined) {
      setValue(controlledName, value);
    }
  }, [value, watch(controlledName)]);

  useImperativeHandle(actionsRef, () => ({
    setValue: newValue => {
      setValue(controlledName, newValue, { shouldValidate: true });
    },
  }));

  const {
    fieldState: { error },
  } = useController({ name: controlledName, control });
  const errorMessage = error?.message || "";

  useEffect(() => handleValidation(), [errorMessage]);

  return (
    <Controller
      control={control}
      name={controlledName}
      rules={{ ...validations }}
      defaultValue={value ?? defaultValue ?? ""}
      render={({
        field: {
          onChange: onControllerChange,
          onBlur: onControllerBlur,
          name: controllerName,
          ...rest
        },
      }) => {
        const fieldProps = {
          ...rest,
          id: identifier,
          className: styles.input,
          name: (validations || name) && controllerName,
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

        return (
          <FormFieldWrapper
            {...props}
            value={rest.value}
            error={errorMessage}
            identifier={identifier}
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
              return (
                <textarea
                  {...textFieldProps}
                  rows={rows}
                  ref={inputRef as MutableRefObject<HTMLTextAreaElement>}
                />
              );
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
                    ref={inputRef as MutableRefObject<HTMLInputElement>}
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
          setValue(controlledName, "", { shouldValidate: true });
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
      }}
    />
  );

  function handleValidation() {
    onValidation && onValidation(errorMessage);
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
