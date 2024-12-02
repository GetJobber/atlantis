import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useEffect,
  useId,
  useImperativeHandle,
} from "react";
import {
  FieldValues,
  RegisterOptions,
  UseFormSetValue,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";
import { FieldActionsRef, FormFieldProps } from "./FormFieldTypes";
import styles from "./FormField.module.css";
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

export function useAtlantisReactForm({
  actionsRef,
  name,
  defaultValue,
  value,
  validations,
  inputRef,
}: {
  actionsRef?: React.RefObject<FieldActionsRef>;
  name: string;
  defaultValue?: string | Date;
  value?: string | Date | number;
  validations?: RegisterOptions;
  inputRef?: React.RefObject<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
}) {
  const formContext = useFormContext();
  // If there isn't a Form Context being provided, get a form for this field.
  const { control, setValue, watch } =
    formContext ?? useForm({ mode: "onTouched" });
  useImperativeHandle(actionsRef, () => ({
    setValue: newValue => {
      setValue(name, newValue, { shouldValidate: true });
    },
  }));
  const {
    field: { onChange, onBlur, ref: fieldRef, ...rest },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: validations,
    defaultValue: value ?? defaultValue ?? "",
  });

  useEffect(() => {
    if (value != undefined) {
      setValue(name, value);
    }
  }, [value, watch(name)]);

  const inputRefs = mergeRefs([inputRef, fieldRef]);

  return {
    inputRefs,
    rest,
    setValue,
    errorMessage: error?.message || "",
    onControllerChange: onChange,
    onControllerBlur: onBlur,
  };
}

export function useAtlantisFormFieldName({
  id,
  nameProp,
}: {
  id: string;
  nameProp?: string;
}) {
  /**
   * Generate a name if one is not supplied, this is the name
   * that will be used for react-hook-form and not neccessarily
   * attached to the DOM
   */
  const name = nameProp ? nameProp : `generatedName--${id}`;

  return { name };
}

export function useAtlantisFormField({
  id,
  nameProp,
  name,
  rest,
  description,
  disabled,
  readonly,
  keyboard,
  autofocus,
  handleChange,
  handleBlur,
  handleFocus,
  inline,
  validations,
  handleKeyDown,
  handleValidation,
  errorMessage,
}: {
  id: string;
  nameProp?: string;
  name: string;
  actionsRef?: React.RefObject<FieldActionsRef>;
  rest: object;
  description?: string;
  disabled?: boolean;
  readonly?: boolean;
  keyboard?: string;
  errorMessage: string;
  autofocus?: boolean;
  validations: boolean;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  handleBlur: () => void;
  handleFocus: (
    event: FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  inline?: boolean;
  handleKeyDown: (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleValidation: (message: string) => void;
}) {
  const descriptionIdentifier = `descriptionUUID--${id}`;

  const fieldProps = {
    ...rest,
    id,
    className: styles.input,
    name: (validations || nameProp) && name,
    disabled: disabled,
    readOnly: readonly,
    inputMode: keyboard as
      | "text"
      | "none"
      | "tel"
      | "url"
      | "email"
      | "numeric",
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
  useEffect(() => handleValidation(errorMessage), [errorMessage]);

  return { textFieldProps, fieldProps, descriptionIdentifier };
}

export function useAtlantisFormFieldActions({
  name,
  onChange,
  inputRef,
  onControllerChange,
  onControllerBlur,
  onEnter,
  readonly,
  type,
  setValue,
  onFocus,
  onBlur,
  onValidation,
}: {
  name: string;
  onChange?:
    | ((
        newValue: string | number | boolean | Date,
        event?: ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
      ) => void)
    | undefined;
  inputRef?: React.RefObject<HTMLInputElement>;
  onControllerChange: (...event: unknown[]) => void;
  onControllerBlur: () => void;
  onEnter?: ((event: React.KeyboardEvent) => void) | undefined;
  readonly?: boolean;
  type: string;
  setValue: UseFormSetValue<FieldValues>;
  onFocus?: (() => void) | undefined;
  onBlur?: (() => void) | undefined;
  onValidation?: ((message: string) => void) | undefined;
}) {
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

  return {
    handleClear,
    handleChange,
    handleKeyDown,
    handleFocus,
    handleBlur,
    handleValidation,
  };
}

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

  const { name } = useAtlantisFormFieldName({ id, nameProp });

  const {
    errorMessage,
    inputRefs,
    rest,
    setValue,
    onControllerBlur,
    onControllerChange,
  } = useAtlantisReactForm({
    actionsRef,
    name,
    defaultValue,
    value,
    validations,
    inputRef,
  });
  const {
    handleValidation,
    handleBlur,
    handleChange,
    handleClear,
    handleFocus,
    handleKeyDown,
  } = useAtlantisFormFieldActions({
    onChange,
    onEnter,
    readonly,
    type,
    onFocus,
    setValue,
    onBlur,
    onValidation,
    onControllerBlur,
    onControllerChange,
    name,
  });

  const { textFieldProps, fieldProps, descriptionIdentifier } =
    useAtlantisFormField({
      id,
      nameProp,
      actionsRef,
      rest,
      name,
      description,
      validations: !!validations,
      disabled,
      readonly,
      keyboard,
      autofocus,
      handleChange,
      handleBlur,
      handleFocus,
      inline,
      errorMessage,
      handleValidation,
      handleKeyDown,
    });

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
