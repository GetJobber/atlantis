import { CommonFormFieldProps, FormFieldProps } from "../FormField";

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
  /**
   * The version of the component.
   */
  version?: 1 | 2;
}

export interface InputTimeRebuiltProps
  extends Omit<InputTimeProps, "defaultValue" | "version"> {
  defaultValue?: never;
  version: 2;
}
