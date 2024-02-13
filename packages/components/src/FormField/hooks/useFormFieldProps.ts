import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  RefObject,
  useEffect,
  useId,
  useState,
} from "react";
import styles from "../FormField.css";
import { FormFieldProps, FormFieldPureProps } from "../FormFieldTypes";

export const useFormFieldProps = ({
  onValidation,
  onChange,
  disabled,
  readonly,
  onFocus,
  keyboard,
  description,
  inline,
  message,
  type,
  name,
  ...rest
}: FormFieldPureProps) => {
  const [identifier] = useState(useId());
  const [descriptionIdentifier] = useState(`descriptionUUID--${useId()}`);

  const error = getErrorMessage();
  useEffect(() => handleValidation(message || "", onValidation), [error]);
  const fieldProps = {
    ...rest,
    id: identifier,
    className: styles.input,
    name: name,
    disabled: disabled,
    readOnly: readonly,
    inputMode: keyboard,
    onChange: (
      event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => onChange && handleChange(event, type, onChange),
    onFocus: onFocus && handleFocus,
    ...(description &&
      !inline && { "aria-describedby": descriptionIdentifier }),
  };
  delete fieldProps.actionsRef;
  delete fieldProps.inputRef;
  delete fieldProps.pure;
  delete fieldProps.miniLabel;

  const textFieldProps = {
    ...fieldProps,
    onKeyDown: (
      event: KeyboardEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => handleKeyDown(event, rest.onEnter),
  };

  return {
    identifier,
    descriptionIdentifier,
    textFieldProps,
    handleClear,
    fieldProps,
    setAutocomplete,
  };
};

function getErrorMessage(message?: string) {
  if (typeof message === "string") {
    return message;
  }

  return "";
}

function handleValidation(
  error: string,
  onValidation?: FormFieldProps["onValidation"],
) {
  onValidation && onValidation(error);
}

function handleChange(
  event: ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
  type: FormFieldProps["type"],
  onChange: FormFieldProps["onChange"],
) {
  let newValue: string | number;
  newValue = event.currentTarget.value;

  if (type === "number" && newValue.length > 0) {
    newValue = parseFloat(newValue);
  }

  onChange && onChange(newValue, event);
}

function handleKeyDown(
  event: KeyboardEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
  onEnter: FormFieldProps["onEnter"],
) {
  if (!onEnter) return;
  if (event.key !== "Enter") return;
  if (event.shiftKey || event.ctrlKey) return;
  event.preventDefault();
  onEnter && onEnter(event);
}

function setAutocomplete(
  autocompleteSetting: boolean | FormFieldProps["autocomplete"],
) {
  if (autocompleteSetting === true) {
    return undefined;
  } else if (autocompleteSetting === false) {
    return "off";
  }

  return autocompleteSetting;
}

function handleFocus(
  event: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  readonly: FormFieldProps["readonly"],
  onFocus: FormFieldProps["onFocus"],
) {
  const target = event.currentTarget;

  if ((target as HTMLInputElement).select) {
    setTimeout(() => readonly && (target as HTMLInputElement).select());
  }

  onFocus && onFocus();
}

function handleClear(
  onChange?: FormFieldProps["onChange"],
  inputRef?: RefObject<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
) {
  onChange && onChange("");
  inputRef?.current?.focus();
}
