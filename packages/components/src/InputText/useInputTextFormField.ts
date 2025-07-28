import { ChangeEvent, FocusEvent, KeyboardEvent, ReactElement } from "react";
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
  readonly error?: string;

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
  readonly description?: string | ReactElement;

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

  readonly invalid?: boolean;
}

export interface UseInputTextFormFieldReturn {
  fieldProps: React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
}

/**
 * Provides the props for the html fields rendered by the html input.
 *  DO not repeat this pattern. We are doing this as a proof of concept relating to the refactoring of Form inputs to see what can be removed.
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
  error,
  ...rest
}: useInputTextFormFieldProps) {
  const descriptionIdentifier = `descriptionUUID--${id}`;
  const fieldProps = {
    ...rest,
    id,
    className: styles.input,
    name,
    disabled: rest.disabled,
    inputMode: rest.inputMode,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    ...(description &&
      !inline && { "aria-describedby": descriptionIdentifier }),
    "aria-invalid":
      rest["aria-invalid"] || error || rest.invalid ? true : undefined,
    autoFocus: rest.autoFocus,
    invalid: error || rest.invalid ? "true" : undefined,
    onKeyDown: handleKeyDown,
  };

  return { fieldProps, descriptionIdentifier };
}
