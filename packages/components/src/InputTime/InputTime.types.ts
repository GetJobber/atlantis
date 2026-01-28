import type { Ref } from "react";
import type { CommonFormFieldProps, FormFieldProps } from "../FormField";
import type {
  FocusEvents,
  HTMLInputBaseProps,
  KeyboardEvents,
  MouseEvents,
  RebuiltInputCommonProps,
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
  extends HTMLInputBaseProps,
    FocusEvents<HTMLInputElement>,
    KeyboardEvents<HTMLInputElement>,
    MouseEvents<HTMLInputElement>,
    RebuiltInputCommonProps,
    Pick<InputTimeProps, "value" | "onChange"> {
  /**
   * Maximum numerical or date value.
   */
  readonly max?: number;

  /**
   * Minimum numerical or date value.
   */
  readonly min?: number;

  readonly inputRef?: Ref<HTMLInputElement | null>;

  /**
   * @deprecated Use `onKeyDown` or `onKeyUp` instead.
   */
  readonly onEnter?: FormFieldProps["onEnter"];
}
