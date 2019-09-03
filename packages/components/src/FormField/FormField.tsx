import React, { ChangeEvent, ReactNode, Ref, useEffect, useState } from "react";
import classnames from "classnames";
import uuid from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "../Icon";
import { Text } from "../Text";
import styles from "./FormField.css";

export interface FormFieldProps {
  /**
   * Determines the alignment of the text inside the input.
   */
  readonly align?: "center" | "right";

  /**
   * If you need to pass in a children. For example, `<options>` inside
   * `<select>`.
   */
  readonly children?: ReactNode;

  /**
   * Initial value of the input. Only use this when you need to pre-populate
   * the field with a data that is not controlled by the components state. If a
   * state is controlling the value, use the `value` prop instead.
   */
  readonly defaultValue?: string;

  /**
   * Disable the input
   */
  readonly disabled?: boolean;

  /**
   * **EXPERIMENTAL** This feature is still under development.
   *
   * Show an error message and highlight the the field red.
   */
  readonly errorMessage?: string;

  /**
   * Adjusts the form field to go inline with a content. This also silences the
   * given `errorMessage` prop. You'd have to used the `onValidate` prop to
   * capture the message and render it somewhere else using the `Text` component.
   */
  readonly inline?: boolean;

  /**
   * Highlights the field red to indicate an error.
   */
  readonly invalid?: boolean;

  /**
   * Specifies the maximum numerical or date value that a user can type
   */
  readonly max?: number;

  /**
   * Maximum character length for an input. This also changes the width to
   * roughly the same size as the max length. This is to communicate that the
   * user that on certain cases, they can only type a limited amount of
   * characters.
   */
  readonly maxLength?: number;

  /**
   * Specifies the minimum numerical or date value that a user can type
   */
  readonly min?: number;

  /**
   * Name of the input.
   */
  readonly name?: string;

  /**
   * Hint text that goes above the value once the form is filled out.
   */
  readonly placeholder?: string;

  /**
   * Prevents users from editing the value.
   */
  readonly readonly?: boolean;

  /**
   * Exclusively for textareas. Specifies the visible height of a textarea.
   */
  readonly rows?: number;

  /**
   * Adjusts the interface to either have small or large spacing.
   */
  readonly size?: "small" | "large";

  /**
   * Determines what kind of form field should the component give you.
   */
  readonly type?: "text" | "number" | "time" | "textarea" | "select";

  /**
   * **EXPERIMENTAL** This feature is still under development.
   */
  readonly validations?: ValidationProp[];

  /**
   * Set the component to the given value.
   */
  readonly value?: string | number;

  /**
   * Simplified onChange handler that only provides the new value.
   * @param newValue
   */
  onChange?(newValue: string | number): void;

  /**
   * Focus callback.
   */
  onFocus?(): void;

  /**
   * Blur callback.
   */
  onBlur?(): void;

  /**
   * **EXPERIMENTAL** This feature is still under development.
   *
   * Callback to get the the status and message when validating a field
   * @param status
   * @param message
   */
  onValidate?(status: "pass" | "fail", message: string): void;
}

export const FormField = React.forwardRef(
  (
    {
      align,
      children,
      defaultValue,
      disabled,
      errorMessage,
      inline,
      invalid,
      max,
      maxLength,
      min,
      name,
      onFocus,
      onBlur,
      onChange,
      onValidate,
      placeholder,
      readonly,
      rows,
      size,
      type = "text",
      value,
      validations,
    }: FormFieldProps,
    ref:
      | Ref<HTMLInputElement>
      | Ref<HTMLTextAreaElement>
      | Ref<HTMLSelectElement>,
  ) => {
    const [hasMiniLabel, setHasMiniLabel] = useState(
      defaultValue || value ? true : false,
    );
    const identifier = uuid.v1();

    useEffect(() => {
      handleValidation();
    }, [value]);

    let hasErrors = false;
    if (validations) {
      hasErrors =
        validations.filter(
          validation => validation.shouldShow && validation.status === "error",
        ).length > 0;
    }

    const wrapperClassNames = classnames(
      styles.wrapper,
      inline && styles.inline,
      size && styles[size],
      align && styles[align],
      errorMessage && styles.hasErrorMessage,
      (invalid || errorMessage || hasErrors) && styles.invalid,
      disabled && styles.disabled,
      maxLength && styles.maxLength,
      {
        [styles.miniLabel]:
          (hasMiniLabel || type === "time" || type === "select") && placeholder,
      },
    );

    const Wrapper = inline ? "span" : "div";

    return (
      <>
        {errorMessage && !inline && (
          <Text variation="error">{errorMessage}</Text>
        )}

        {validations && <InputValidation messages={validations} />}

        <Wrapper
          className={wrapperClassNames}
          style={{ ["--formField-maxLength" as string]: maxLength || max }}
        >
          <label className={styles.label} htmlFor={identifier}>
            {placeholder || " "}
          </label>
          {fieldElement()}
          {type === "select" && (
            <span className={styles.icon}>
              <Icon name="arrowDown" />
            </span>
          )}
        </Wrapper>
      </>
    );

    function fieldElement() {
      const fieldProps = {
        id: identifier,
        className: styles.formField,
        name: name,
        disabled: disabled,
        readOnly: readonly,
        onChange: handleChange,
        value: value,
        ...(defaultValue && { defaultValue: defaultValue }),
      };

      switch (type) {
        case "select":
          return <select {...fieldProps}>{children}</select>;
        case "textarea":
          return (
            <textarea
              rows={rows}
              onFocus={handleFocus}
              onBlur={handleBlur}
              ref={ref as Ref<HTMLTextAreaElement>}
              {...fieldProps}
            />
          );
        default:
          return (
            <input
              type={type}
              maxLength={maxLength}
              max={max}
              min={min}
              onFocus={handleFocus}
              onBlur={handleBlur}
              ref={ref as Ref<HTMLInputElement>}
              {...fieldProps}
            />
          );
      }
    }

    function handleChange(
      event:
        | ChangeEvent<HTMLInputElement>
        | ChangeEvent<HTMLTextAreaElement>
        | ChangeEvent<HTMLSelectElement>,
    ) {
      let newValue: string | number;
      newValue = event.currentTarget.value;
      setHasMiniLabel(newValue.length > 0);

      if (type === "number" && newValue.length > 0) {
        newValue = parseFloat(newValue);
      }
      onChange && onChange(newValue);
    }

    function handleFocus(
      event:
        | React.FocusEvent<HTMLInputElement>
        | React.FocusEvent<HTMLTextAreaElement>,
    ) {
      const target = event.currentTarget;
      setTimeout(() => readonly && target.select());

      onFocus && onFocus();
    }

    function handleBlur() {
      onBlur && onBlur();
    }

    function handleValidation() {
      const status = errorMessage ? "fail" : "pass";
      const message = errorMessage || "";
      onValidate && onValidate(status, message);
    }
  },
);

type ValidationStatus = "success" | "error" | "warn" | "info";

interface ValidationProp {
  status: ValidationStatus;
  message: string;
  shouldShow?: boolean;
}

interface InputValidationProp {
  messages: ValidationProp[];
}

interface StatusMap {
  [key: string]: ValidationStatus;
}

function InputValidation({ messages }: InputValidationProp) {
  const variationMap: StatusMap = {
    success: "success",
    error: "error",
    warn: "warn",
    info: "info",
  };

  const variants = {
    slideOut: { y: "5%", height: 0, opacity: 0 },
    slideIn: { y: 0, height: "100%", opacity: 1 },
  };

  return (
    <div className={styles.hasValidationMessage}>
      {messages.map(
        ({ status, message, shouldShow = true }: ValidationProp) => (
          <AnimatePresence initial={false} key={`${status}-${message}`}>
            {shouldShow && (
              <motion.div
                variants={variants}
                initial="slideOut"
                animate="slideIn"
                exit="slideOut"
                transition={{ duration: 0.2 }}
              >
                <Text variation={variationMap[status]}>{message}</Text>
              </motion.div>
            )}
          </AnimatePresence>
        ),
      )}
    </div>
  );
}
