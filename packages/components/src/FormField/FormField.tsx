import React, {
  PropsWithChildren,
  createContext,
  forwardRef,
  useContext,
  useId,
} from "react";
import { FormFieldProps } from "./FormFieldTypes";
import { FormFieldLabel, FormFieldWrapper } from "./FormFieldWrapper";
import { FormFieldPostFix } from "./FormFieldPostFix";
import { useAtlantisFormFieldActions } from "./hooks/useAtlantisFormFieldActions";
import { useAtlantisFormField } from "./hooks/useAtlantisFormField";
import { useAtlantisFormFieldName } from "./hooks/useAtlantisFormFieldName";
import { useAtlantisReactHookForm } from "./hooks/useAtlantisReactHookForm";
import { FormFieldDescription } from "./FormFieldDescription";
import styles from "./FormField.module.css";
import {
  useFormFieldWrapperStyles,
  useFormFieldWrapperStylesProps,
} from "./hooks/useFormFieldWrapperStyles";
import { InputValidation } from "../InputValidation";

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
    useControllerField,
    setValue,
    onControllerBlur,
    onControllerChange,
  } = useAtlantisReactHookForm({
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
    inputRef,
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
      useControllerField,
      name,
      nameProp,
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
      value={useControllerField.value}
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

export const FormFieldContext = createContext<
  Omit<FormFieldProviderProps, "children">
>({
  disabled: false,
  valid: true,
  readOnly: false,
  descriptionIdentifier: "",
});

FormField.Provider = function FormFieldProvider(props: FormFieldProviderProps) {
  return (
    <FormFieldContext.Provider
      value={{
        disabled: props.disabled,
        valid: props.valid,
        readOnly: props.readOnly,
        wrapperClasses: props.wrapperClasses,
        wrapperInlineStyle: props.wrapperInlineStyle,
      }}
    >
      {props.children}
    </FormFieldContext.Provider>
  );
};

FormField.Control = function FormFieldControl(props: FormFieldControlProps) {
  const { containerClasses, wrapperClasses, wrapperInlineStyle } =
    useFormFieldWrapperStyles(props);

  return (
    <FormField.Provider
      wrapperClasses={wrapperClasses}
      wrapperInlineStyle={wrapperInlineStyle}
    >
      <div className={containerClasses}>{props.children}</div>
    </FormField.Provider>
  );
};

// eslint-disable-next-line react/display-name
FormField.Input = forwardRef(
  ({ autoComplete, ...rest }: React.InputHTMLAttributes<object>, ref) => {
    const { wrapperClasses, wrapperInlineStyle } = useFormFieldState();

    return (
      <div
        className={wrapperClasses}
        style={wrapperInlineStyle}
        data-testid="Form-Field-Wrapper"
      >
        <input
          className={styles.input}
          autoComplete={setAutocomplete(autoComplete == "autocomplete")}
          ref={ref as React.RefObject<HTMLInputElement>}
          {...rest}
        />
      </div>
    );
  },
);

export const useFormFieldState = () => {
  return useContext(FormFieldContext);
};

FormField.Label = function FormLabel({ children, style }: FormFieldLabelProps) {
  const localStyle = style || { position: "relative" };

  return <FormFieldLabel placeholder={children} style={localStyle} />;
};

FormField.HelperText = function FormLabel({ children }: FormFieldLabelProps) {
  const { descriptionIdentifier } = useFormFieldState();

  return (
    <FormFieldDescription description={children} id={descriptionIdentifier} />
  );
};

FormField.ErrorMessage = function FormErrorMessage({
  children,
}: PropsWithChildren) {
  return <InputValidation message={children} />;
};

interface FormFieldLabelProps {
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
}

interface FormFieldControlProps extends useFormFieldWrapperStylesProps {
  readonly children: React.ReactNode;
  readonly containerChildren?: React.ReactNode;
  readonly wrapperRef?: React.RefObject<HTMLDivElement>;
}

interface FormFieldProviderProps {
  readonly children: React.ReactNode;
  readonly disabled?: boolean;
  readonly valid?: boolean;
  readonly readOnly?: boolean;
  readonly descriptionIdentifier?: string;
  readonly wrapperClasses?: string;
  readonly wrapperInlineStyle?: React.CSSProperties;
}
