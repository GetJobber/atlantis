import type { CommonFormFieldProps, FormFieldProps } from "../FormField";
import type {
  FocusEvents,
  HTMLInputBaseProps,
  KeyboardEvents,
  RebuiltInputCommonProps,
} from "../sharedHelpers/types";

export type InputEmailLegacyProps = CommonFormFieldProps &
  Pick<
    FormFieldProps,
    "maxLength" | "readonly" | "validations" | "defaultValue"
  >;

export const validationMessage = "Please enter a valid email";

export type InputEmailVersion = 1 | 2 | undefined;

/**
 * Experimental version 2 of the InputEmail component.
 * Do not use unless you have talked with Atlantis first.
 */
export interface InputEmailRebuiltProps
  extends HTMLInputBaseProps,
    FocusEvents<HTMLInputElement>,
    KeyboardEvents<HTMLInputElement>,
    RebuiltInputCommonProps {
  /**
   * The current value of the input.
   */
  readonly value?: string;

  /**
   * Custom onChange handler that provides the new value as the first argument.
   */
  readonly onChange?: (
    newValue: string,
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => void;

  /**
   * @deprecated Use `onKeyDown` or `onKeyUp` instead.
   */
  readonly onEnter?: FormFieldProps["onEnter"];
}
