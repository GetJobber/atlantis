import React from "react";
import { CommonFormFieldProps, FormFieldProps } from "../FormField";

export type InputNumberVersion = 1 | 2 | undefined;

export interface InputNumber2Props
  extends CommonFormFieldProps,
    Pick<
      FormFieldProps,
      // | "maxLength"
      // | "autocomplete"
      // | "max"
      // | "min"
      | "onFocus"
      | "onBlur"
      | "inputRef"
      // | "validations"
      | "readonly"
      | "size"
      // | "defaultValue"
      // | "keyboard"
      // | "prefix"
      // | "suffix"
    > {
  readonly align?: "center" | "right"; // todo add left and make it default
  readonly autocomplete?: boolean;
  readonly autoFocus?: boolean;
  readonly defaultValue?: number;
  readonly description?: string;
  readonly error?: string;
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

/**
 * Experimental version 2 of the InputNumber component.
 * Do not use unless you have talked with Atlantis first.
 */

// export interface InputNumberRebuiltProps
//   extends Omit<
//     React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
//     | "onChange"
//     | "onBlur"
//     | "maxLength"
//     | "rows"
//     | "size"
//     | "suffix"
//     | "prefix"
//     | "value"
//     | "max"
//     | "min"
//     | "defaultValue"
//   > {
//   readonly error?: string;

//   readonly invalid?: boolean;
//   readonly identifier?: string;
//   // readonly autocomplete?: boolean | AutocompleteTypes;
//   readonly loading?: boolean;
//   readonly onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
//   readonly children?: React.ReactNode;
//   // readonly clearable?: Clearable;
//   /**
//    * Version 2 is highly experimental. Avoid using it unless you have talked with Atlantis first.
//    */
//   readonly version: 2;

//   readonly onChange?: (
//     newValue: number,
//     event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => void;
//   readonly onEnter?: FormFieldProps["onEnter"];

//   readonly onBlur?: FormFieldProps["onBlur"];
//   readonly value: number;

//   readonly maxLength?: number;

//   readonly size?: FormFieldProps["size"];
//   readonly inline?: FormFieldProps["inline"];
//   readonly align?: FormFieldProps["align"];

//   readonly toolbar?: FormFieldProps["toolbar"];
//   readonly toolbarVisibility?: FormFieldProps["toolbarVisibility"];

//   readonly prefix?: FormFieldProps["prefix"];
//   readonly suffix?: FormFieldProps["suffix"];
//   readonly description?: FormFieldProps["description"];
// }
