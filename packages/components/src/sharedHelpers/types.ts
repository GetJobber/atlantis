import type { AriaAttributes, ReactNode } from "react";
import type React from "react";
import type { XOR } from "ts-xor";
import type { Clearable } from "@jobber/hooks";
import type { IconNames } from "../Icon";

export interface CommonAtlantisProps {
  /** Standard HTML data attributes. Accepts anything in a {{"data-key":"value"}} format. */
  dataAttributes?: { [key: `data-${string}`]: string };
  /** Standard HTML aria attributes. Accepts all standard HTML aria attributes. */
  ariaAttributes?: React.AriaAttributes;
  /** Standard HTML role attribute. */
  role?: React.AriaRole;
  /** Standard HTML id attribute. */
  id?: string;
}

/**
 * Core ARIA attributes for input elements.
 * Uses camelCase naming for consistency with React props pattern.
 * Based on React's canonical ARIA type definitions.
 */
export interface AriaInputProps {
  /**
   * Defines a string value that labels the current element.
   * @see {@link https://www.w3.org/TR/wai-aria-1.2/#aria-label}
   */
  readonly ariaLabel?: AriaAttributes["aria-label"];

  /**
   * Identifies the element (or elements) that labels the current element.
   * @see {@link https://www.w3.org/TR/wai-aria-1.2/#aria-labelledby}
   */
  readonly ariaLabelledBy?: AriaAttributes["aria-labelledby"];

  /**
   * Identifies the element (or elements) that describes the object.
   * @see {@link https://www.w3.org/TR/wai-aria-1.2/#aria-describedby}
   */
  readonly ariaDescribedBy?: AriaAttributes["aria-describedby"];

  /**
   * Identifies the element (or elements) that provide a detailed, extended description.
   * @see {@link https://www.w3.org/TR/wai-aria-1.2/#aria-details}
   */
  readonly ariaDetails?: AriaAttributes["aria-details"];

  /**
   * ID of the currently active descendant element.
   * Used for composite widgets like combobox or listbox.
   * @see {@link https://www.w3.org/TR/wai-aria-1.2/#aria-activedescendant}
   */
  readonly ariaActiveDescendant?: AriaAttributes["aria-activedescendant"];

  /**
   * Indicates the entered value does not conform to the format expected.
   * Supports boolean or specific error types: "grammar" | "spelling".
   * @see {@link https://www.w3.org/TR/wai-aria-1.2/#aria-invalid}
   */
  readonly ariaInvalid?: AriaAttributes["aria-invalid"];

  /**
   * Indicates the element that controls the current element.
   * @see {@link https://www.w3.org/TR/wai-aria-1.2/#aria-controls}
   */
  readonly ariaControls?: AriaAttributes["aria-controls"];

  /**
   * Indicates whether the element is expanded or collapsed.
   * @see {@link https://www.w3.org/TR/wai-aria-1.2/#aria-expanded}
   */
  readonly ariaExpanded?: AriaAttributes["aria-expanded"];

  /**
   * Indicates the type of autocomplete interaction.
   * @see {@link https://www.w3.org/TR/wai-aria-1.2/#aria-autocomplete}
   */
  readonly ariaAutocomplete?: AriaAttributes["aria-autocomplete"];

  /**
   * Indicates that user input is required before form submission.
   * @see {@link https://www.w3.org/TR/wai-aria-1.2/#aria-required}
   */
  readonly ariaRequired?: AriaAttributes["aria-required"];
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
   * Whether the input is disabled.
   */
  readonly disabled?: boolean;

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
 * Numeric/date constraint props for inputs that support min/max values.
 * Only extend this for input types where these make semantic sense (number, date, range, etc.).
 */
export interface InputConstraintProps {
  /**
   * Maximum numerical or date value.
   */
  readonly max?: number | string;

  /**
   * Minimum numerical or date value.
   */
  readonly min?: number | string;
}

/**
 * Character length constraint for inputs.
 * Only extend this for text-based inputs where character limits make sense.
 */
export interface InputLengthConstraint {
  /**
   * Maximum character length for the input.
   * Note: This affects both HTML validation AND visual width of the component.
   * Future work will separate these concerns.
   */
  readonly maxLength?: number;
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

/**
 * Common props shared across all rebuilt input components.
 * These are Atlantis-specific features not part of standard HTML inputs.
 */
export interface RebuiltInputCommonProps {
  /**
   * Text that appears inside the input when empty and floats above the value
   * as a mini label once the user enters a value.
   * When showMiniLabel is false, this text only serves as a standard placeholder and
   * disappears when the user types.
   */
  readonly placeholder?: string;

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

/** Represents a day of the week as a number where 0 = Sunday, 1 = Monday, etc. */
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type CommonAllowedElements =
  | "section"
  | "p"
  | "article"
  | "ul"
  | "li"
  | "div"
  | "span"
  | "dl"
  | "dd"
  | "dt";

export type Spaces =
  | "none"
  | "minuscule"
  | "slim"
  | "smallest"
  | "smaller"
  | "small"
  | "base"
  | "large"
  | "larger"
  | "largest"
  | "extravagant";
export type GapSpacing = Spaces | (string & NonNullable<unknown>);
