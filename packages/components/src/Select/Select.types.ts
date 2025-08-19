import type { CommonFormFieldProps, FormFieldProps } from "../FormField";

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
    > {
  /**
   * Changes the width to roughly the same size as the maximum character length
   */
  readonly maxLength?: number;
}

/**
 * Rebuilt version of the Select component without React Hook Form dependency.
 */
export interface SelectRebuiltProps
  extends Omit<
    SelectLegacyProps,
    | "defaultValue"
    | "version"
    | "onChange"
    | "value"
    | "validations"
    | "onValidation"
  > {
  defaultValue?: never;
  readonly value?: string | number;
  onChange?(newValue?: string | number): void;
  version: 2;
  error?: string;
  /**
   * Opt-in to the customizable select UI (Chromium 123+).
   * When true, the component will apply the custom select styles
   * Defaults to false for native behavior.
   * Only supported by Select version={2}.
   */
  readonly UNSAFE_experimentalStyles?: boolean;
}
