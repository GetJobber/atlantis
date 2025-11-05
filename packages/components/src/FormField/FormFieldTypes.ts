import type { ChangeEvent, ReactNode, RefObject } from "react";
import type React from "react";
import type { RegisterOptions } from "react-hook-form";
import type { XOR } from "ts-xor";
import type { Clearable } from "@jobber/hooks";
import type { IconNames } from "../Icon";

export type FormFieldTypes =
  | "text"
  | "password"
  | "number"
  | "time"
  | "textarea"
  | "select"
  | "tel"
  | "email";

export type KeyBoardTypes =
  | "text"
  | "none"
  | "tel"
  | "url"
  | "email"
  | "numeric"
  | "decimal";

export type AutocompleteTypes =
  | "one-time-code"
  | "address-line1"
  | "address-line2";

/**
 * ARIA attributes for accessibility.
 * Common attributes that can be used across input components.
 */
export interface AriaInputProps {
  /**
   * ARIA label for accessibility.
   */
  readonly "aria-label"?: string;

  /**
   * ARIA described-by for accessibility.
   */
  readonly "aria-describedby"?: string;

  /**
   * ARIA invalid state for accessibility.
   */
  readonly "aria-invalid"?: boolean | "true" | "false";

  /**
   * ARIA controls attribute.
   */
  readonly "aria-controls"?: string;

  /**
   * ARIA expanded state.
   */
  readonly "aria-expanded"?: boolean;

  /**
   * ARIA active descendant.
   */
  readonly "aria-activedescendant"?: string;

  /**
   * ARIA autocomplete attribute.
   */
  readonly "aria-autocomplete"?: "none" | "inline" | "list" | "both";

  /**
   * ARIA required attribute.
   */
  readonly "aria-required"?: boolean;
}

/**
 * Focus event handlers for input elements.
 * Generic interface that can be specialized for different element types.
 */
export interface FocusEvents<Target = HTMLElement> {
  /**
   * Focus event handler.
   */
  readonly onFocus?: (event: React.FocusEvent<Target>) => void;

  /**
   * Blur event handler.
   */
  readonly onBlur?: (event: React.FocusEvent<Target>) => void;
}

/**
 * Keyboard event handlers for input elements.
 * Generic interface that can be specialized for different element types.
 */
export interface KeyboardEvents<Target = HTMLElement> {
  /**
   * Key down event handler.
   */
  readonly onKeyDown?: (event: React.KeyboardEvent<Target>) => void;

  /**
   * Key up event handler.
   */
  readonly onKeyUp?: (event: React.KeyboardEvent<Target>) => void;
}

/**
 * Curated set of HTML input attributes for rebuilt input components.
 * This provides a whitelist of standard HTML/React props we want to support,
 * avoiding the issues of extending React.InputHTMLAttributes directly.
 * Note: Event handlers and ARIA attributes are separate - use FocusEvents, KeyboardEvents, and AriaInputProps.
 */
export interface HTMLInputBaseProps extends AriaInputProps {
  /**
   * The unique identifier for the input element.
   */
  readonly id?: string;

  /**
   * The name attribute for the input element.
   */
  readonly name?: string;

  /**
   * Placeholder text that appears when the input is empty.
   */
  readonly placeholder?: string;

  /**
   * Whether the input is disabled.
   */
  readonly disabled?: boolean;

  /**
   * Whether the input is required.
   */
  readonly required?: boolean;

  /**
   * Whether the input is read-only (HTML standard casing).
   */
  readonly readOnly?: boolean;

  /**
   * Whether the input should be auto-focused (React casing).
   */
  readonly autoFocus?: boolean;

  /**
   * Autocomplete behavior for the input (React casing, string values only).
   * Use standard HTML autocomplete values or "on"/"off".
   */
  readonly autoComplete?: string;

  /**
   * Maximum character length for the input (HTML validation only).
   * Note: In v2, this does NOT affect the visual width of the component.
   * Use CSS or the size prop for width control.
   */
  readonly maxLength?: number;

  /**
   * Minimum character length for the input.
   */
  readonly minLength?: number;

  /**
   * Maximum numerical value (for number inputs).
   */
  readonly max?: number | string;

  /**
   * Minimum numerical value (for number inputs).
   */
  readonly min?: number | string;

  /**
   * Validation pattern (regex) for the input.
   */
  readonly pattern?: string;

  /**
   * Input mode hint for virtual keyboards.
   */
  readonly inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";

  /**
   * Role attribute for accessibility.
   */
  readonly role?: string;

  /**
   * Tab index for keyboard navigation.
   */
  readonly tabIndex?: number;
}

/**
 * Common props shared across all rebuilt input components.
 * These are Atlantis-specific features not part of standard HTML inputs.
 */
export interface RebuiltInputCommonProps {
  /**
   * Error message to display. This also highlights the field red.
   */
  readonly error?: string;

  /**
   * Highlights the field red to indicate an error.
   */
  readonly invalid?: boolean;

  /**
   * Show a spinner to indicate loading.
   */
  readonly loading?: boolean;

  /**
   * Add a clear action on the input that clears the value.
   */
  readonly clearable?: Clearable;

  /**
   * Adjusts the interface to either have small or large spacing.
   */
  readonly size?: "small" | "large";

  /**
   * Adjusts the form field to go inline with content.
   */
  readonly inline?: boolean;

  /**
   * Determines the alignment of the text inside the input.
   */
  readonly align?: "center" | "right";

  /**
   * Adds a prefix label and icon to the field.
   */
  readonly prefix?: Affix;

  /**
   * Adds a suffix label and icon with an optional action to the field.
   */
  readonly suffix?: XOR<Affix, Suffix>;

  /**
   * Further description of the input, can be used for a hint.
   */
  readonly description?: ReactNode;

  /**
   * Children elements to render inside the component.
   */
  readonly children?: ReactNode;

  /**
   * Version 2 is highly experimental. Avoid using it unless you have talked with Atlantis first.
   */
  readonly version: 2;
}

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
   * A unique identifier for the input.
   */
  readonly id?: string;

  /**
   * Determines the alignment of the text inside the input.
   */
  readonly align?: "center" | "right";

  /**
   * Further description of the input, can be used for a hint.
   */
  readonly description?: ReactNode;

  /**
   * Disable the input
   */
  readonly disabled?: boolean;

  /**
   * Controls the visibility of the mini label that appears inside the input
   * when a value is entered. By default, the placeholder text moves up to
   * become a mini label. Set to false to disable this behavior.
   *
   * @default true
   */
  readonly showMiniLabel?: boolean;

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
   * Text that appears inside the input when empty and floats above the value
   * as a mini label once the user enters a value.
   * When showMiniLabel is false, this text only serves as a standard placeholder and
   * disappears when the user types.
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

  /**
   * Add a clear action on the input that clears the value.
   *
   * You should always use `while-editing` if you want the input to be
   * clearable. if the input value isn't editable (i.e. `InputTime`) you can
   * set it to `always`.
   */
  readonly clearable?: Clearable;

  /**
   * Experimental:
   * Determine which version of the FormField to use.
   * Right now this isn't used but it will be used in the future
   * to allow us to release new versions of our form inputs without breaking existing functionality.
   */
  version?: 1;
}

export interface FormFieldProps extends CommonFormFieldProps {
  actionsRef?: RefObject<FieldActionsRef>;

  /**
   * Determines if the input should be auto-focused, using the HTML attribute
   */
  readonly autofocus?: boolean;

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

  wrapperRef?: RefObject<HTMLDivElement>;

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
  onFocus?(event?: React.FocusEvent): void;

  /**
   * Blur callback.
   */
  onBlur?(event?: React.FocusEvent): void;

  onKeyUp?(event: React.KeyboardEvent<HTMLInputElement>): void;

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
  readonly validations?: RegisterOptions;

  /**
   * Toolbar to render content below the input.
   */
  readonly toolbar?: React.ReactNode;

  /**
   * Determines the visibility of the toolbar.
   */
  readonly toolbarVisibility?: "always" | "while-editing";

  /**
   * Pattern is currently only used for the InputPhone type
   * it is used to determine the format of the phone number
   * and the number of digits to expect.
   */
  readonly pattern?: string;
}
