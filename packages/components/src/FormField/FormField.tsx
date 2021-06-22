import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import classnames from "classnames";
import uuid from "uuid";
import { Controller, useForm, useFormContext } from "react-hook-form";
import styles from "./FormField.css";
import { FormFieldProps } from "./FormFieldTypes";
import { FormLabel } from "./FormLabel";
import { FieldWrapper } from "./FieldWrapper";
import { FormSpinner } from "./FormSpinner";
import { Icon } from "../Icon";
import { InputValidation } from "../InputValidation";

export function FormField(props: FormFieldProps) {
  const { name } = props;
  const {
    autocomplete = true,
    loading,
    type,
    validations,
    disabled,
    value,
    defaultValue,
    keyboard,
    inputRef,
    rows,
    readonly,
    inline,
    actionsRef,
    min,
    max,
    maxLength,
    children,
    onChange,
    onEnter,
    onFocus,
    onBlur,
    onValidation,
  } = props;

  const { control, errors, setValue } =
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

  const [hasMiniLabel, setHasMiniLabel] = useState(
    shouldShowMiniLabel(defaultValue, value),
  );

  useEffect(() => {
    if (value != undefined) {
      setValue(controlledName, value);
      setHasMiniLabel(String(value).length > 0);
    }
  }, [value]);

  useImperativeHandle(actionsRef, () => ({
    setValue: newValue => {
      setValue(controlledName, newValue);
    },
  }));

  const error = errors[controlledName] && errors[controlledName].message;
  useEffect(() => handleValidation(), [error]);

  return (
    <FieldWrapper {...props} error={error} hasMiniLabel={hasMiniLabel}>
      <FormLabel {...props} identifier={identifier} />
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
          const fieldClasses = classnames(styles.formField, {
            [styles.select]: type === "select",
          });

          const fieldProps = {
            ...rest,
            id: identifier,
            className: fieldClasses,
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

          return renderField();

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
                    rows={rows}
                    ref={inputRef as MutableRefObject<HTMLTextAreaElement>}
                    {...textFieldProps}
                  />
                );
              default:
                return (
                  <>
                    <input
                      autoComplete={setAutocomplete(autocomplete)}
                      type={type}
                      maxLength={maxLength}
                      max={max}
                      min={min}
                      ref={inputRef as MutableRefObject<HTMLInputElement>}
                      {...textFieldProps}
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

            setHasMiniLabel(String(newValue).length > 0);
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

          function setAutocomplete(autocompleteSetting: boolean | string) {
            if (autocompleteSetting === "one-time-code") {
              return "one-time-code";
            }

            return autocompleteSetting ? undefined : "autocomplete-off";
          }
        }}
      />
      {error && !inline && <InputValidation message={error} />}
    </FieldWrapper>
  );

  function handleValidation() {
    onValidation && onValidation(error);
  }
}

function shouldShowMiniLabel(
  defaultValue: string | number | undefined,
  value: string | number | undefined,
) {
  const activeValue = defaultValue || value;
  if (typeof activeValue === "string") {
    return activeValue.length > 0;
  } else {
    return activeValue != undefined;
  }
}
