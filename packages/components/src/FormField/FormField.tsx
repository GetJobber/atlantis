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
import { Icon, IconNames } from "../Icon";
import { InputValidation } from "../InputValidation";

export function FormField(props: FormFieldProps) {
  const {
    actionsRef,
    autocomplete = true,
    children,
    defaultValue,
    disabled,
    inline,
    inputRef,
    keyboard,
    loading,
    max,
    maxLength,
    min,
    name,
    readonly,
    rows,
    type = "text",
    validations,
    value,
    onChange,
    onEnter,
    onFocus,
    onBlur,
    onValidation,
    size,
    prefixIcon,
    prefixText,
    postfixText,
    postfixIcon,
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

  const [hasMiniLabel, setHasMiniLabel] = useState(
    shouldShowMiniLabel(defaultValue, value),
  );

  useEffect(() => {
    if (value != undefined) {
      setValue(controlledName, value);
      setHasMiniLabel(String(value).length > 0);
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
    <FieldWrapper {...props} error={error} hasMiniLabel={hasMiniLabel}>
      <FormLabel {...props} identifier={identifier} />
      <Controller
        control={control}
        name={controlledName}
        rules={{ ...validations }}
        defaultValue={value ?? defaultValue ?? ""}
        // eslint-disable-next-line max-statements
        render={({
          onChange: onControllerChange,
          onBlur: onControllerBlur,
          name: controllerName,
          ...rest
        }) => {
          const fieldClasses = classnames(
            styles.formField,
            styles.affix,
            { [styles.select]: type === "select" },
            {
              [styles.withPrefix]: !prefixIcon != !prefixText,
            },
            {
              [styles.withDoublePrefix]: prefixIcon && prefixText,
            },

            {
              [styles.withPostfix]: !postfixIcon != !postfixText,
            },
            {
              [styles.withDoublePostfix]: postfixIcon && postfixText,
            },
          );

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
          function getPrefixIcon(icon: IconNames) {
            if (icon) {
              return (
                <span className={styles.prefixIcon}>
                  <Icon size={size} name={icon}></Icon>
                </span>
              );
            }
            return;
          }

          function getPrefixText(text: string | number) {
            if (text) {
              return <span className={styles.prefixText}>{text}</span>;
            }
            return;
          }

          function getPostfixIcon(icon: IconNames) {
            if (icon) {
              return (
                <span className={styles.postfixIcon}>
                  <Icon size={size} name={icon}></Icon>
                </span>
              );
            }
            return;
          }

          function getPostfixText(text: string | number) {
            if (text) {
              return <span className={styles.postfixText}>{text}</span>;
            }
            return;
          }

          function prefix() {
            return (
              <div className={styles.prefixes}>
                {prefixIcon && getPrefixIcon(prefixIcon)}
                {prefixText && getPrefixText(prefixText)}
              </div>
            );
          }

          function postfix() {
            return (
              <div className={styles.postfixes}>
                {postfixText && getPostfixText(postfixText)}
                {postfixIcon && getPostfixIcon(postfixIcon)}
              </div>
            );
          }

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
                    {...textFieldProps}
                    rows={rows}
                    ref={inputRef as MutableRefObject<HTMLTextAreaElement>}
                  />
                );
              default:
                return (
                  <>
                    {prefixIcon || prefixText ? prefix() : false}
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
                    {postfixIcon || postfixText ? postfix() : false}
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
