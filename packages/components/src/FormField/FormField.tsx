import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  MutableRefObject,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import classnames from "classnames";
import styles from "./FormField.css";
import { FormFieldProps } from "./FormFieldTypes";
import { FormLabel } from "./FormLabel";
import { FieldWrapper } from "./FieldWrapper";
import { FormSpinner } from "./FormSpinner";
import { useFormController } from "./useFormController";
import { Icon } from "../Icon";
import { InputValidation } from "../InputValidation";

/**
 * Disabling max line statements here as this component
 * has a lot of handlers and there is no way around this.
 */
// eslint-disable-next-line max-statements
export function FormField(props: PropsWithChildren<FormFieldProps>) {
  const {
    autocomplete = true,
    children,
    defaultValue,
    disabled,
    inline,
    name,
    keyboard,
    loading,
    maxLength,
    max,
    min,
    readonly,
    rows,
    type = "text",
    value,
    validations,
    inputRef,
    onChange,
    onValidation,
    onEnter,
    onBlur,
    onFocus,
  } = props;

  const { error, field } = useFormController({
    name,
    value: value || defaultValue,
    validations,
  });

  const [hasMiniLabel, setHasMiniLabel] = useState(
    shouldShowMiniLabel(defaultValue, value),
  );

  useEffect(() => handleValidation(), [error]);

  const fieldClasses = classnames(styles.formField, {
    [styles.select]: type === "select",
  });

  const fieldProps = {
    ...field,
    className: fieldClasses,
    disabled: disabled,
    id: field.name,
    inputMode: keyboard,
    name: (name || validations) && field.name,
    readOnly: readonly,
    value: value ?? field.value,
    onChange: handleChange,
  };

  const textFieldProps = {
    ...fieldProps,
    onBlur: handleBlur,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
  };

  return (
    <FieldWrapper {...props} error={error?.message} hasMiniLabel={hasMiniLabel}>
      <FormLabel {...props} identifier={field.name} />
      {renderField()}
      {error && !inline && <InputValidation message={error?.message} />}
    </FieldWrapper>
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
            ref={element => {
              field.ref(element);
              if (inputRef && element) {
                (inputRef as MutableRefObject<HTMLTextAreaElement>).current = element;
              }
            }}
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
              ref={element => {
                field.ref(element);
                if (inputRef && element) {
                  (inputRef as MutableRefObject<HTMLInputElement>).current = element;
                }
              }}
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
    field.onChange(event);
  }

  function handleValidation() {
    onValidation && onValidation(error?.message);
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

  function handleBlur() {
    onBlur && onBlur();
    field.onBlur();
  }

  function handleFocus(
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const target = event.currentTarget;
    setTimeout(() => readonly && target.select());
    onFocus && onFocus();
  }
}

function setAutocomplete(setting: boolean | string) {
  if (setting === "one-time-code") {
    return "one-time-code";
  }

  return setting ? undefined : "autocomplete-off";
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
