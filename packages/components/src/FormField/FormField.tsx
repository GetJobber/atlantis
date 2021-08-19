import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MutableRefObject,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import uuid from "uuid";
import { Controller, useForm, useFormContext } from "react-hook-form";
import classNames from "classnames";
import { FormFieldProps } from "./FormFieldTypes";
import styles from "./FormFieldStyles.css";
import { Icon } from "../Icon";
import { InputValidation } from "../InputValidation";
import { Spinner } from "../Spinner";

export function FormField(props: FormFieldProps) {
  const {
    actionsRef,
    autocomplete = true,
    children,
    defaultValue,
    disabled,
    inputRef,
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
          name: (props.validations || props.name) && controllerName,
          disabled: disabled,
          readOnly: readonly,
          inputMode: keyboard,
          onChange: handleChange,
        };

        const textFieldProps = {
          ...fieldProps,
          onBlur: handleBlur,
          onFocus: handleFocus,
          onKeyDown: handleKeyDown,
        };

        return (
          <NewFieldWrapper {...props} value={rest.value} error={error}>
            {renderField()}
          </NewFieldWrapper>
        );

        function renderField() {
          switch (type) {
            case "select":
              return (
                <>
                  <select {...fieldProps}>{children}</select>
                  <span className={styles.postfix}>
                    <Icon name="arrowDown" />
                  </span>
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
                  {loading && <FormSpinner />}
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

          onChange && onChange(newValue);
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

interface NewFieldWrapperProps extends FormFieldProps {
  error: string;
}

function NewFieldWrapper(props: PropsWithChildren<NewFieldWrapperProps>) {
  const {
    align,
    placeholder,
    value,
    children,
    invalid,
    error,
    size,
    prefix,
    suffix,
    max,
    maxLength,
    type,
    disabled,
    inline,
  } = props;

  const wrapperClasses = classNames(
    styles.wrapper,
    size && styles[size],
    align && styles[align],
    {
      [styles.miniLabel]:
        (placeholder && value !== "") || (placeholder && type === "select"),
      [styles.textarea]: type === "textarea",
      [styles.invalid]: invalid ?? error,
      [styles.disabled]: disabled,
      [styles.inline]: inline,
      [styles.maxLength]: maxLength,
      [styles.select]: type === "select",
    },
  );

  const wrapperInlineStyle = {
    ["--formField-maxLength" as string]: maxLength || max,
  };

  return (
    <>
      <div className={wrapperClasses} style={wrapperInlineStyle}>
        {prefix?.icon && <div>Icon</div>}
        <div className={styles.inputWrapper}>
          {prefix?.label && <div>Prefix</div>}
          <label className={styles.label}>{placeholder}</label>
          {children}
          {suffix?.label && <div>Suffix</div>}
        </div>
        {suffix?.icon && <div>Icon</div>}
      </div>
      {error && !inline && <InputValidation message={error} />}
    </>
  );
}

function FormSpinner() {
  return (
    <div className={styles.postfix}>
      <Spinner size="small" />
    </div>
  );
}
