import { ReactNode, RefObject } from "react";
import { ValidationRules } from "react-hook-form";

export type FormFieldTypes =
  | "text"
  | "password"
  | "number"
  | "time"
  | "textarea"
  | "select"
  | "email";

export interface FieldActionsRef {
  setValue(value: string | number): void;
}

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

  actionsRef?: RefObject<FieldActionsRef>;
}
