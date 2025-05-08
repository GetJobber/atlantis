import React from "react";
import { FormFieldProps } from "../FormField";

export type InputNumberVersion = 1 | 2 | undefined;
/**
 * Experimental version 2 of the InputNumber component.
 * Do not use unless you have talked with Atlantis first.
 */

export interface InputNumberRebuiltProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
    | "onChange"
    | "onBlur"
    | "maxLength"
    | "rows"
    | "size"
    | "suffix"
    | "prefix"
    | "value"
    | "max"
    | "min"
    | "defaultValue"
  > {
  readonly error?: string;

  readonly invalid?: boolean;
  readonly identifier?: string;
  // readonly autocomplete?: boolean | AutocompleteTypes;
  readonly loading?: boolean;
  readonly onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  readonly children?: React.ReactNode;
  // readonly clearable?: Clearable;
  /**
   * Version 2 is highly experimental. Avoid using it unless you have talked with Atlantis first.
   */
  readonly version: 2;

  readonly onChange?: (
    newValue: number,
    event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  readonly onEnter?: FormFieldProps["onEnter"];

  readonly onBlur?: FormFieldProps["onBlur"];
  readonly value: number;

  readonly maxLength?: number;

  readonly size?: FormFieldProps["size"];
  readonly inline?: FormFieldProps["inline"];
  readonly align?: FormFieldProps["align"];

  readonly toolbar?: FormFieldProps["toolbar"];
  readonly toolbarVisibility?: FormFieldProps["toolbarVisibility"];

  readonly prefix?: FormFieldProps["prefix"];
  readonly suffix?: FormFieldProps["suffix"];
  readonly description?: FormFieldProps["description"];
}
