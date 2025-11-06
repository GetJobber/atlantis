import type { CommonFormFieldProps, FormFieldProps } from "../FormField";
import type { AriaInputProps, FocusEvents } from "../FormField/FormFieldTypes";

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
      | "autofocus"
      | "inputRef"
      | "onEnter"
      | "onBlur"
      | "onFocus"
    >,
    AriaInputProps,
    FocusEvents<HTMLSelectElement> {
  defaultValue?: never;
  readonly value?: string | number;
  onChange?(newValue?: string | number): void;
  version: 2;
  error?: string;

  /**
   * @deprecated Use `autoFocus` (camelCase) instead.
   */
  readonly autofocus?: boolean;

  /**
   * Automatically focus the select when mounted.
   */
  readonly autoFocus?: boolean;

  /**
   * @deprecated Use `ref` instead. Note: `ref` support requires React 18+ forwardRef.
   */
  readonly inputRef?: FormFieldProps["inputRef"];

  /**
   * @deprecated Use `onKeyDown` or `onKeyUp` instead.
   */
  readonly onEnter?: FormFieldProps["onEnter"];

  /**
   * Opt-in to the customizable select UI (Chromium 123+).
   * When true, the component will apply the custom select styles
   * Defaults to false for native behavior.
   * Only supported by Select version={2}.
   */
  readonly UNSAFE_experimentalStyles?: boolean;
}
