import { ChangeEvent, FocusEvent, KeyboardEvent, useEffect } from "react";
import { UseControllerReturn } from "react-hook-form";
import classNames from "classnames";
import styles from "../FormField.module.css";
import type { FormFieldProps, KeyBoardTypes } from "../FormFieldTypes";

export interface useAtlantisFormFieldProps
  extends Pick<
    FormFieldProps,
    | "description"
    | "disabled"
    | "readonly"
    | "inline"
    | "autofocus"
    | "pattern"
    | "type"
    | "value"
  > {
  /**
   * The html id for the field
   */
  readonly id: string;
  /**
   * The name for the html input field if one if provided by consumers of the component
   */
  readonly nameProp?: string;
  /**
   * The auto-generated name for the html input field if a nameProp is not provided
   */
  readonly name: string;
  /**
   * The ref used to access the FieldActions of the field
   */
  // readonly actionsRef?: React.RefObject<FieldActionsRef>;
  /**
   * The field returned from react-hook-form's useController
   */
  readonly useControllerField: Omit<
    UseControllerReturn["field"],
    "ref" | "onChange" | "onBlur"
  >;

  /**
   * The keyboard type for the field. This is used to provide hints to the browser about the type of keyboard to display on mobile devices
   */
  readonly keyboard?: KeyBoardTypes;
  /**
   * The error message for the field
   */
  readonly errorMessage: string;

  /**
   * Determines if the field has validations
   */
  readonly validations: boolean;

  /**
   * Callback for when the field value changes
   */
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  /**
   * Callback for when the field loses focus
   */
  handleBlur: () => void;
  /**
   * Callback for when the field gains focus
   */
  handleFocus: (
    event: FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;

  /**
   * Callback for when keydown event is triggered on the field
   */
  handleKeyDown: (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  /**
   * Callback that exposes the error message when the field is validated
   */
  handleValidation: (message: string) => void;
}

/**
 * Provides the props for the html fields rendered by the FormField component
 */
export function useAtlantisFormField({
  id,
  nameProp,
  name,
  useControllerField: useControllerField,
  description,
  disabled,
  readonly,
  keyboard,
  autofocus,
  pattern,
  type,
  value,
  handleChange,
  handleBlur,
  handleFocus,
  inline,
  validations,
  handleKeyDown,
  handleValidation,
  errorMessage,
}: useAtlantisFormFieldProps) {
  const descriptionIdentifier = `descriptionUUID--${id}`;

  const fieldProps = {
    ...useControllerField,
    id,
    className: classNames(styles.input, {
      [styles.emptyPhoneNumber]: shouldAddPhoneNumberClass(
        type,
        value,
        pattern,
      ),
    }),
    name: (validations || nameProp) && name,
    disabled: disabled,
    readOnly: readonly,
    inputMode: keyboard,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    autoFocus: autofocus,
    ...(description &&
      !inline && { "aria-describedby": descriptionIdentifier }),
  };

  const textFieldProps = {
    ...fieldProps,
    autoFocus: autofocus,
    onKeyDown: handleKeyDown,
  };
  useEffect(() => handleValidation(errorMessage), [errorMessage]);

  return { textFieldProps, fieldProps, descriptionIdentifier };
}

function shouldAddPhoneNumberClass(
  type: string | undefined,
  value: string | number | Date | undefined,
  pattern: string | undefined,
) {
  return type === "tel" && !value && pattern && pattern[0] === "(";
}
