import { Clearable } from "@jobber/hooks";
import { FormFieldProps } from "../FormField";

/**
 * Rebuilt version of the Select component without React Hook Form dependency.
 */
export interface SelectRebuiltProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    | "onChange"
    | "onBlur"
    | "size"
    | "value"
    | "defaultValue"
    | "prefix"
    | "suffix"
  > {
  readonly error?: string;
  readonly invalid?: boolean;
  readonly identifier?: string;
  readonly loading?: boolean;
  readonly children?: React.ReactNode;
  readonly clearable?: Clearable;

  /**
   * Version 2 designates the rebuilt component without RHF dependency
   */
  readonly version: 2;

  readonly onChange?: (
    newValue: string,
    event?: React.ChangeEvent<HTMLSelectElement>,
  ) => void;

  readonly onBlur?: FormFieldProps["onBlur"];
  readonly onFocus?: FormFieldProps["onFocus"];
  readonly value?: string;
  readonly defaultValue?: string;

  readonly size?: FormFieldProps["size"];
  readonly inline?: FormFieldProps["inline"];
  readonly align?: FormFieldProps["align"];

  readonly prefix?: FormFieldProps["prefix"];
  readonly suffix?: FormFieldProps["suffix"];
  readonly description?: FormFieldProps["description"];
  readonly disabled?: boolean;
  readonly readonly?: boolean;
  readonly autofocus?: boolean;
}

/**
 * The following is the same as:
 *   type BaseProps = Omit<FormFieldProps, "type" | "children">;
 * Unfortunately Docz doesn't currently support Omit so it has been reduced to
 * its component parts.
 */
export type SelectProps = Pick<
  FormFieldProps,
  Exclude<
    keyof FormFieldProps,
    "type" | "rows" | "keyboard" | "actionsRef" | "clearable" | "pattern"
  >
>;
