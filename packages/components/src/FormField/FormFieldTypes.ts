import { ChangeEvent, ReactNode, RefObject } from "react";
import { ValidationRules } from "react-hook-form";
import { XOR } from "ts-xor";
import { IconNames } from "../Icon";

export type FormFieldTypes =
  | "text"
  | "password"
  | "number"
  | "time"
  | "textarea"
  | "select"
  | "email";

export type AutocompleteTypes =
  | "one-time-code"
  | "address-line1"
  | "address-line2";

export interface FieldActionsRef {
  setValue(value: string | number): void;
}

export interface Affix {
  readonly label?: string;
  readonly icon?: IconNames;
}

interface BaseSuffix extends Affix {
  readonly icon: IconNames;
  onClick?(): void;
}

export interface Suffix extends BaseSuffix {
  onClick(): void;
  readonly ariaLabel: string;
}

/*
 * The following interface supplies common
 * props used in multiple components or extended in other
 * interfaces.
 */
export interface CommonFormFieldProps {
  /**
   * Determines the alignment of the text inside the input.
   */
  readonly align?: "center" | "right";

  /**
   * Further description of the input, can be used for a hint.
   */
  readonly description?: string;

  /**
   * Disable the input
   */
  readonly disabled?: boolean;

  /**
   * Highlights the field red to indicate an error.
   */
  readonly invalid?: boolean;

  /**
   * Adjusts the form field to go inline with a content. This also silences the
   * given `validations` prop. You'd have to used the `onValidate` prop to
   * capture the message and render it somewhere else using the
   * `InputValidation` component.
   */
  readonly inline?: boolean;

  /**
   * Show a spinner to indicate loading
   */
  loading?: boolean;

  /**
   * Name of the input.
   */
  readonly name?: string;

  /**
   * onChange handler that provides the new value (or event)
   * @param newValue
   * @param event
   */
  onChange?(
    newValue: string | number | boolean | Date,
    event?: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void;

  /**
   * Callback to get the the status and message when validating a field
   * @param message
   */
  onValidation?(message: string): void;

  /**
   * Hint text that goes above the value once the form is filled out.
   */
  readonly placeholder?: string;

  /**
   * Adjusts the interface to either have small or large spacing.
   */
  readonly size?: "small" | "large";

  /**
   * Set the component to the given value.
   */
  readonly value?: string | number | Date;
}

export interface FormFieldProps extends CommonFormFieldProps {
  actionsRef?: RefObject<FieldActionsRef>;

  /**
   * Determines if browser form autocomplete is enabled.
   * Note that "one-time-code" is experimental and should not be used without
   * consultation. "address-line1" and "address-line2" are
   * used for billing address information.
   */
  readonly autocomplete?: boolean | AutocompleteTypes;

  /**
   * If you need to pass in a children. For example, `<options>` inside
   * `<select>`.
   */
  readonly children?: ReactNode;

  inputRef?: RefObject<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;

  /**
   * Initial value of the input. Only use this when you need to pre-populate
   * the field with a data that is not controlled by the components state. If a
   * state is controlling the value, use the `value` prop instead.
   */
  readonly defaultValue?: string | Date;

  /**
   * Determines what kind of keyboard appears on mobile web.
   */
  readonly keyboard?: "numeric" | "decimal";

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
   * Adds a prefix label and icon to the field
   */
  readonly prefix?: Affix;

  /**
   * Adds a suffix label and icon with an optional action to the field
   */
  readonly suffix?: XOR<Affix, Suffix>;

  /**
   * Simplified onChange handler that only provides the new value.
   * @param newValue
   * Specifies the minimum numerical or date value that a user can type
   */
  readonly min?: number;

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
   * Exclusively for textareas. Specifies the visible height of a textarea.
   */
  readonly rows?: number;

  /**
   * Prevents users from editing the value.
   */
  readonly readonly?: boolean;

  /**
   * Determines what kind of form field should the component give you.
   */
  readonly type?: FormFieldTypes;

  /**
   * Show an error message above the field. This also
   * highlights the the field red if an error message shows up.
   */
  readonly validations?: ValidationRules;
}
