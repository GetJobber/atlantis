import { Clearable } from "@jobber/hooks/src";
import {
  AutocompleteTypes,
  FormFieldProps,
  FormFieldTypes,
} from "../FormField";

export interface RowRange {
  min: number;
  max: number;
}

export type InputTextVersion = 1 | 2 | undefined;

export interface InputTextRebuiltProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
    | "onChange"
    | "onBlur"
    | "maxLength"
    | "rows"
    | "size"
    | "suffix"
    | "prefix"
    | "max"
    | "min"
    | "defaultValue"
  > {
  readonly error?: string;

  readonly invalid?: boolean;
  readonly identifier?: string;
  readonly autocomplete?: boolean | AutocompleteTypes;
  readonly loading?: boolean;
  readonly onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  readonly children?: React.ReactNode;
  readonly clearable?: Clearable;
  /**
   * Use this when you're expecting a long answer.
   */
  readonly multiline?: boolean;

  /**
   * Specifies the visible height of a long answer form field. Can be in the
   * form of a single number to set a static height, or an object with a min
   * and max keys indicating the minimum number of visible rows, and the
   * maximum number of visible rows.
   */
  readonly rows?: number | RowRange;
  readonly version: Extract<InputTextVersion, 2>;
  readonly type?: FormFieldTypes;

  readonly onChange?: (
    newValue: string,
    event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  readonly onEnter?: FormFieldProps["onEnter"];

  readonly onBlur?: FormFieldProps["onBlur"];
  readonly value: string;

  readonly maxLength?: number;

  readonly size?: FormFieldProps["size"];
  readonly inline?: FormFieldProps["inline"];
  readonly align?: FormFieldProps["align"];

  readonly toolbar?: FormFieldProps["toolbar"];
  readonly toolbarVisibility?: FormFieldProps["toolbarVisibility"];

  readonly prefix?: FormFieldProps["prefix"];
  readonly suffix?: FormFieldProps["suffix"];
}
