import { ChangeEvent, FocusEvent, KeyboardEvent } from "react";

export interface useInputPhoneFormFieldProps {
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
  readonly description?: string;

  /**
   * Callback for when the field value changes
   */
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Callback for when the field loses focus
   */
  handleBlur: () => void;
  /**
   * Callback for when the field gains focus
   */
  handleFocus: (event: FocusEvent<HTMLInputElement>) => void;

  /**
   * Callback for when keydown event is triggered on the field
   */
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;

  readonly invalid?: boolean;
  readonly disabled?: boolean;
  readonly autofocus?: boolean;
  readonly value?: string;
  readonly readonly?: boolean;
}

export interface UseInputPhoneFormFieldReturn {
  fieldProps: React.InputHTMLAttributes<HTMLInputElement>;
}

/**
 * Provides the props for the html fields rendered by the html input.
 *  DO not repeat this pattern. We are doing this as a proof of concept relating to the refactoring of Form inputs to see what can be removed.
 */
export function useInputPhoneFormField({
  id,
  name,
  description,
  inline,
  handleChange,
  handleBlur,
  handleFocus,
  handleKeyDown,
  error,
  disabled,
  autofocus,
  value,
  readonly,
  ...rest
}: useInputPhoneFormFieldProps) {
  const descriptionIdentifier = `descriptionUUID--${id}`;

  const fieldProps = {
    ...rest,
    id,
    name,
    disabled,
    autoFocus: autofocus,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    value,
    invalid: error || rest.invalid ? "true" : undefined,
    ...(description &&
      !inline && { "aria-describedby": descriptionIdentifier }),
    readOnly: readonly,
  };

  return { fieldProps, descriptionIdentifier };
}
