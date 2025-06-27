import React from "react";
import { CommonFormFieldProps, FormFieldProps } from "../FormField";

export type InputNumberVersion = 1 | 2 | undefined;

export interface InputNumberRebuiltProps
  extends Omit<CommonFormFieldProps, "version">,
    Pick<
      FormFieldProps,
      "onFocus" | "onBlur" | "inputRef" | "readonly" | "size"
    > {
  readonly align?: "center" | "right"; // todo add left and make it default
  readonly autocomplete?: boolean;
  readonly autoFocus?: boolean;
  readonly defaultValue?: number;
  readonly description?: string;
  readonly error?: string;
  readonly formatOptions?: Intl.NumberFormatOptions;
  readonly identifier?: string;
  readonly inline?: boolean;
  readonly invalid?: boolean;
  readonly maxValue?: number;
  readonly minValue?: number;
  readonly onChange?: (
    newValue: number,
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  readonly showMiniLabel?: boolean;
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
