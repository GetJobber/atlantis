import { CommonFormFieldProps, FormFieldProps } from "../FormField";

export interface SelectProps
  extends Pick<
      CommonFormFieldProps,
      | "id"
      | "align"
      | "description"
      | "disabled"
      | "invalid"
      | "inline"
      | "name"
      | "onValidation"
      | "placeholder"
      | "size"
    >,
    Pick<
      FormFieldProps,
      | "autofocus"
      | "onEnter"
      | "onBlur"
      | "onFocus"
      | "inputRef"
      | "wrapperRef"
      | "validations"
      | "children"
      | "prefix"
      | "suffix"
    > {
  readonly defaultValue?: string | number;
  readonly value?: string | number;
  onChange?(newValue?: string | number): void;
  version?: 1 | 2;
}

/**
 * Rebuilt version of the Select component without React Hook Form dependency.
 */
export interface SelectRebuiltProps
  extends Omit<SelectProps, "defaultValue" | "version"> {
  defaultValue?: never;
  version: 2;
}
