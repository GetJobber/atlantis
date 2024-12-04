import { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import styles from "../FormField/FormField.module.css";

export interface useInputTextFormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  /**
   * The html id for the field
   */
  readonly id: string;

  /**
   * The auto-generated name for the html input field if a nameProp is not provided
   */
  readonly name: string;

  /**
   * The error message for the field
   */
  readonly errorMessage: string;

  /**
   * Adjusts the form field to go inline with a content. This also silences the
   * given `validations` prop. You'd have to used the `onValidate` prop to
   * capture the message and render it somewhere else using the
   * `InputValidation` component.
   */
  readonly inline?: boolean;

  /**
   * Further description of the input, can be used for a hint.
   */
  readonly description?: string;

  /**
   * Callback for when the field value changes
   */
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  /**
   * Callback for when the field loses focus
   */
  handleBlur: () => void;
  /**
   * Callback for when the field gains focus
   */
  handleFocus: (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;

  /**
   * Callback for when keydown event is triggered on the field
   */
  handleKeyDown: (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

/**
 * Provides the props for the html fields rendered by the FormField component
 */
export function useInputTextFormField({
  id,
  name,
  description,
  inline,
  handleChange,
  handleBlur,
  handleFocus,
  handleKeyDown,
  errorMessage,
  ...rest
}: useInputTextFormFieldProps) {
  const descriptionIdentifier = `descriptionUUID--${id}`;
  const fieldProps = {
    id,
    className: styles.input,
    name,
    disabled: rest.disabled,
    readOnly: rest.readOnly,
    inputMode: rest.inputMode,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    ...(description &&
      !inline && { "aria-describedby": descriptionIdentifier }),
    "aria-invalid": rest["aria-invalid"] || errorMessage ? true : undefined,
    autoFocus: rest.autoFocus,
    onKeyDown: handleKeyDown,
    ...rest,
  };

  return { fieldProps, descriptionIdentifier };
}
