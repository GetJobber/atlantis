import type { ReactNode } from "react";
import type React from "react";
import type { CommonFormFieldProps, FormFieldProps } from "../FormField";
import type {
  AriaInputProps,
  FocusEvents,
  InputConstraintProps,
  InputLengthConstraint,
  KeyboardEvents,
} from "../sharedHelpers/types";

export type InputNumberVersion = 1 | 2 | undefined;

export interface InputNumberRebuiltProps
  extends Omit<CommonFormFieldProps, "version">,
    AriaInputProps,
    FocusEvents<HTMLInputElement>,
    KeyboardEvents<HTMLInputElement>,
    InputLengthConstraint,
    InputConstraintProps {
  readonly align?: "center" | "right"; // todo add left and make it default

  /**
   * HTML autocomplete attribute for browser autofill.
   */
  readonly autoComplete?: string;

  readonly autoFocus?: boolean;
  readonly defaultValue?: number;
  readonly description?: ReactNode;
  readonly error?: string;
  readonly formatOptions?: Intl.NumberFormatOptions;

  /**
   * The ID of the input element.
   */
  readonly id?: string;

  readonly inline?: boolean;
  readonly invalid?: boolean;
  readonly maxValue?: number;
  readonly minValue?: number;

  /**
   * Callback for value changes.
   * @param newValue - The new numeric value
   * @param event - Optional change event
   */
  readonly onChange?: (
    newValue: number,
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => void;

  /**
   * Whether the input is read-only.
   */
  readonly readOnly?: boolean;

  readonly showMiniLabel?: boolean;
  readonly size?: FormFieldProps["size"];
  readonly value?: number;

  /**
   * Version 2 is highly experimental. Avoid using it unless you have talked with Atlantis first.
   */
  readonly version: 2;
}

export interface InputNumberRebuiltRef {
  focus: () => void;
  blur: () => void;
}
