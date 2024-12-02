import { ChangeEvent, FocusEvent, KeyboardEvent, useEffect } from "react";
import styles from "../FormField.module.css";
import { FieldActionsRef } from "../FormFieldTypes";

export function useAtlantisFormField({
  id,
  nameProp,
  name,
  rest,
  description,
  disabled,
  readonly,
  keyboard,
  autofocus,
  handleChange,
  handleBlur,
  handleFocus,
  inline,
  validations,
  handleKeyDown,
  handleValidation,
  errorMessage,
}: {
  id: string;
  nameProp?: string;
  name: string;
  actionsRef?: React.RefObject<FieldActionsRef>;
  rest: object;
  description?: string;
  disabled?: boolean;
  readonly?: boolean;
  keyboard?: string;
  errorMessage: string;
  autofocus?: boolean;
  validations: boolean;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  handleBlur: () => void;
  handleFocus: (
    event: FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  inline?: boolean;
  handleKeyDown: (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleValidation: (message: string) => void;
}) {
  const descriptionIdentifier = `descriptionUUID--${id}`;

  const fieldProps = {
    ...rest,
    id,
    className: styles.input,
    name: (validations || nameProp) && name,
    disabled: disabled,
    readOnly: readonly,
    inputMode: keyboard as
      | "text"
      | "none"
      | "tel"
      | "url"
      | "email"
      | "numeric",
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
