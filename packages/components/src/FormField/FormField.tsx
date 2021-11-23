import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import uuid from "uuid";
import { Controller, useForm, useFormContext } from "react-hook-form";
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
  } = props;

  const { control, errors, setValue, watch } =
    useFormContext() != undefined
      ? useFormContext()
      : useForm({ mode: "onTouched" });

  const [identifier] = useState(uuid.v1());
  const [descriptionIdentifier] = useState(`descriptionUUID--${uuid.v1()}`);
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
      setValue(controlledName, newValue);
    },
  }));

  const error = errors[controlledName] && errors[controlledName].message;
  useEffect(() => handleValidation(), [error]);

  return (
    <Controller
      control={control}
      name={controlledName}
      rules={{ ...validations }}
      defaultValue={value ?? defaultValue ?? ""}
      render={({
        onChange: onControllerChange,
        onBlur: onControllerBlur,
        name: controllerName,
        ...rest
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
          ...(description &&
            !inline && { "aria-describedby": descriptionIdentifier }),
        };

        const textFieldProps = {
          ...fieldProps,
          onBlur: handleBlur,
          onFocus: handleFocus,
          onKeyDown: handleKeyDown,
        };

        return (
          <FormFieldWrapper
            {...props}
            value={rest.value}
            error={error}
            identifier={identifier}
            descriptionIdentifier={descriptionIdentifier}
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
                  />
                  {loading && <FormFieldPostFix variation="spinner" />}
                </>
              );
          }
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
          event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) {
          const target = event.currentTarget;
          setTimeout(() => readonly && target.select());
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
    onValidation && onValidation(error);
  }
}

function setAutocomplete(
  autocompleteSetting: boolean | FormFieldProps["autocomplete"],
) {
  if (autocompleteSetting === true) {
    return undefined;
  } else if (autocompleteSetting === false) {
    return "autocomplete-off";
  }

  return autocompleteSetting;
}
