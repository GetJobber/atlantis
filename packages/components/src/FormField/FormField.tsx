import React, {
  ChangeEvent,
  MutableRefObject,
  PropsWithChildren,
  ReactNode,
  RefObject,
  useEffect,
  useState,
} from "react";
import classnames from "classnames";
import uuid from "uuid";
import {
  Controller,
  ValidationRules,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";
import styles from "./FormField.css";
import { Icon } from "../Icon";
import { InputValidation } from "../InputValidation";
import { Spinner } from "../Spinner";

type FormFieldTypes =
  | "text"
  | "password"
  | "number"
  | "time"
  | "textarea"
  | "select";

export interface FormFieldProps {
  /**
   * Determines the alignment of the text inside the input.
   */
  readonly align?: "center" | "right";

  /**
   * Determines if browser form autocomplete is enabled.
   * Note that "one-time-code" is experimental and should not be used without
   * consultation.
   */
  readonly autocomplete?: boolean | "one-time-code";

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
   * Adjusts the form field to go inline with a content. This also silences the
   * given `validations` prop. You'd have to used the `onValidate` prop to
   * capture the message and render it somewhere else using the
   * `InputValidation` component.
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
  readonly type?: FormFieldTypes;

  /**
   * Determines what kind of keyboard appears on mobile web.
   */
  readonly keyboard?: "numeric";

  /**
   * Set the component to the given value.
   */
  readonly value?: string | number;

  /**
   * Show a spinner to indicate loading
   */
  loading?: boolean;

  /**
   * Simplified onChange handler that only provides the new value.
   * @param newValue
   */
  onChange?(newValue: string | number): void;

  /**
   * A callback to handle "Enter" keypress. This will only run
   * if Enter is the only key. Will not run if Shift or Control
   * are being held.
   */
  onEnter?(event: React.KeyboardEvent): void;

  /**
   * Focus callback.
   */
  onFocus?(): void;

  /**
   * Blur callback.
   */
  onBlur?(): void;

  /**
   * Callback to get the the status and message when validating a field
   * @param message
   */
  onValidation?(message: string): void;

  /**
   * Show an error message above the field. This also
   * highlights the the field red if an error message shows up.
   */
  readonly validations?: ValidationRules;

  inputRef?: RefObject<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
}

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
    onChange,
    onEnter,
    onFocus,
    onBlur,
    onValidation,
  } = props;

  const { control, errors } =
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
    name ? name : `generatedName--${uuid.v1()}`,
  );
  const [hasMiniLabel, setHasMiniLabel] = useState(
    shouldShowMiniLabel(defaultValue, value),
  );

  const error = errors[controlledName] && errors[controlledName].message;
  useEffect(() => handleValidation(), [error]);
  console.log("FormField render");
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
        const fieldClasses = classnames(styles.formField, {
          [styles.select]: type === "select",
        });

        const fieldProps = {
          ...rest,
          disabled: disabled,
          readOnly: readonly,
          className: fieldClasses,
          id: identifier,
          name: (props.validations || props.name) && controllerName,
          inputMode: keyboard,
          onChange: handleChange,
          onFocus: handleFocus,
          onBlur: handleBlur,
          onKeyDown: handleKeyDown,
        };

        return (
          <FormWrapper {...props} error={error} hasMiniLabel={hasMiniLabel}>
            <FormLabel {...props} identifier={identifier} />
            {type === "textarea" && (
              <textarea
                {...fieldProps}
                ref={inputRef as MutableRefObject<HTMLTextAreaElement>}
                rows={rows}
              />
            )}
            {type !== "textarea" && (
              <input
                {...fieldProps}
                ref={inputRef as MutableRefObject<HTMLInputElement>}
                autoComplete={setAutocomplete(autocomplete)}
                type={type}
              />
            )}
            {type === "text" && loading && <FormSpinner />}
            {error && !inline && <InputValidation message={error} />}
          </FormWrapper>
        );

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
          onControllerChange(event);
          // onControllerChange(newValue);
        }

        function handleKeyDown(
          event:
            | React.KeyboardEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLTextAreaElement>,
        ) {
          if (!onEnter) return;
          if (event.key !== "Enter") return;
          if (event.shiftKey || event.ctrlKey) return;

          event.preventDefault();
          onEnter && onEnter(event);
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
          onControllerBlur();
        }

        function setAutocomplete(autocompleteSetting: boolean | string) {
          if (autocompleteSetting === "one-time-code") return "one-time-code";
          return autocompleteSetting ? undefined : "autocomplete-off";
        }
      }}
    />
  );

  function handleValidation() {
    console.log("validation", error);
    onValidation && onValidation(error);
  }
}

interface FormWrapperProps extends FormFieldProps {
  readonly hasMiniLabel?: boolean;
  readonly error?: string;
}

function FormWrapper({
  align,
  inline,
  max,
  maxLength,
  size,
  disabled,
  hasMiniLabel,
  children,
  type,
  placeholder,
  invalid,
  error,
}: FormWrapperProps) {
  const Wrapper = inline ? "span" : "div";

  const wrapperClassNames = classnames(
    styles.wrapper,
    inline && styles.inline,
    size && styles[size],
    align && styles[align],
    disabled && styles.disabled,
    maxLength && styles.maxLength,
    {
      [styles.miniLabel]:
        (hasMiniLabel || type === "time" || type === "select") && placeholder,
      [styles.invalid]: invalid || error,
    },
  );

  const wrapperInlineStyle = {
    ["--formField-maxLength" as string]: maxLength || max,
  };

  return (
    <Wrapper className={wrapperClassNames} style={wrapperInlineStyle}>
      {children}
    </Wrapper>
  );
}

interface FormLabelProps extends FormFieldProps {
  readonly hasMiniLabel?: boolean;
  readonly identifier: string;
}

function FormLabel({ placeholder, identifier, type }: FormLabelProps) {
  const labelClassNames = classnames(
    styles.label,
    type === "textarea" && styles.textareaLabel,
  );

  return (
    <label htmlFor={identifier} className={labelClassNames}>
      {placeholder}
    </label>
  );
}

function FormSpinner() {
  return (
    <span className={styles.postfix}>
      <Spinner size="small" />
    </span>
  );
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
