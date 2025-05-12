import React from "react";
import { CommonFormFieldProps, FormFieldProps } from "../FormField";

export type InputNumberVersion = 1 | 2 | undefined;

export interface InputNumber2Props
  extends CommonFormFieldProps,
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
  readonly onChange?: (
    newValue: number,
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  readonly showMiniLabel?: boolean;
  readonly value?: number;
}

export interface InputNumber2Ref {
  focus: () => void;
  blur: () => void;
}
