import { CommonFormFieldProps, FormFieldProps } from "../FormField";

export interface SelectLegacyProps
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
      | "value"
      | "onChange"
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
      | "defaultValue"
      | "version"
    > {}

/**
 * Rebuilt version of the Select component without React Hook Form dependency.
 */
export interface SelectRebuiltProps
  extends Omit<
    SelectLegacyProps,
    "defaultValue" | "version" | "onChange" | "value"
  > {
  defaultValue?: never;
  readonly value?: string | number;
  onChange?(newValue?: string | number): void;
  version: 2;
}
