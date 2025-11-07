import type { CommonFormFieldProps, FormFieldProps } from "../FormField";
import type {
  AriaInputProps,
  FocusEvents,
  InputConstraintProps,
  InputLengthConstraint,
  KeyboardEvents,
} from "../sharedHelpers/types";

export interface InputTimeProps
  extends Pick<
      CommonFormFieldProps,
      | "id"
      | "align"
      | "description"
      | "disabled"
      | "invalid"
      | "inline"
      | "loading"
      | "name"
      | "onValidation"
      | "placeholder"
      | "size"
      | "clearable"
    >,
    Pick<
      FormFieldProps,
      | "maxLength"
      | "readonly"
      | "autocomplete"
      | "max"
      | "min"
      | "onEnter"
      | "onFocus"
      | "onBlur"
      | "inputRef"
      | "validations"
    > {
  /**
   * Intial value of the input. Only use this when you need to prepopulate the
   * field with a data that is not controlled by the components state. If a
   * state is controlling the value, use the `value` prop instead.
   */
  readonly defaultValue?: Date;
  /**
   * Set the component to the given value.
   */
  readonly value?: Date;
  /**
   * Function called when user changes input value.
   */
  onChange?(newValue?: Date): void;
}

export interface InputTimeLegacyProps extends InputTimeProps {
  version?: 1;
}

export interface InputTimeRebuiltProps
  extends Omit<
      InputTimeProps,
      | "defaultValue"
      | "version"
      | "validations"
      | "onValidation"
      | "readonly"
      | "autocomplete"
      | "inputRef"
      | "onFocus"
      | "onBlur"
      | "onEnter"
      | "max"
      | "min"
      | "maxLength"
    >,
    AriaInputProps,
    FocusEvents<HTMLInputElement>,
    KeyboardEvents<HTMLInputElement>,
    InputLengthConstraint,
    InputConstraintProps {
  /**
   * Version 2 is highly experimental, avoid using it unless you have talked with Atlantis first.
   */
  version: 2;

  /**
   * Error message to display.
   */
  error?: string;

  /**
   * Whether the input is read-only.
   */
  readonly readOnly?: boolean;

  /**
   * HTML autocomplete attribute for browser autofill.
   */
  readonly autoComplete?: string;

  /**
   * @deprecated Use `ref` instead. Note: `ref` support requires React 18+ forwardRef.
   */
  readonly inputRef?: FormFieldProps["inputRef"];

  /**
   * @deprecated Use `onKeyDown` or `onKeyUp` instead.
   */
  readonly onEnter?: FormFieldProps["onEnter"];
}
