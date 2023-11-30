import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { v1 as uuidv1 } from "uuid";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { useShowClear } from "@jobber/hooks";
import { FormFieldProps } from "./FormFieldTypes";
import styles from "./FormField.css";
import { FormFieldWrapper } from "./FormFieldWrapper";
import { FormFieldPostFix } from "./FormFieldPostFix";
import { ClearAction } from "./ClearAction";

// Added 13th statement to accommodate getErrorMessage function
/*eslint max-statements: ["error", 15]*/
// eslint-disable-next-line max-statements
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
    clearable = "never",
  } = props;

  const [focused, setFocused] = useState(false);

  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext() != undefined
    ? useFormContext()
    : // If there isn't a Form Context being provided, get a form for this field.
      useForm({ mode: "onTouched" });

  const [identifier] = useState(uuidv1());
  const [descriptionIdentifier] = useState(`descriptionUUID--${uuidv1()}`);
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

  const message = errors[controlledName]?.message;
  const error = getErrorMessage();
  useEffect(() => handleValidation(), [error]);

  const showClear = useShowClear({
    clearable,
    multiline: false,
    focused,
    hasValue: Boolean(value),
    disabled,
  });

  console.log({
    clearable,
    multiline: false,
    focused,
    hasValue: Boolean(value),
    disabled,
    value,
  });

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
          ...(description &&
            !inline && { "aria-describedby": descriptionIdentifier }),
        };

        const textFieldProps = {
          ...fieldProps,
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
                  {showClear && (
                    <ClearAction
                      onClick={() => handleClear()}
                      // hasMarginRight={type === "time"}
                    />
                  )}
                  {children}
                </>
              );
          }
        }

        function handleClear() {
          // setValue(controlledName, "");
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
          setFocused(true);
        }

        function handleBlur() {
          onBlur && onBlur();
          onControllerBlur();
          setFocused(false);
        }
      }}
    />
  );

  function getErrorMessage() {
    if (typeof message === "string") {
      return message;
    }

    return "";
  }

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
    return "off";
  }

  return autocompleteSetting;
}
