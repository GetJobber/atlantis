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
      | "loading"
      | "name"
      | "onValidation"
      | "placeholder"
      | "size"
    >,
    Pick<
      FormFieldProps,
      | "readonly"
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
  readonly defaultValue?: string;
  readonly value?: string;
  onChange?(newValue?: string): void;
  version?: 1 | 2;
}

/**
 * Rebuilt version of the Select component without React Hook Form dependency.
 */
export interface SelectRebuiltProps extends Omit<SelectProps, "defaultValue"> {
  version: 2;
}
