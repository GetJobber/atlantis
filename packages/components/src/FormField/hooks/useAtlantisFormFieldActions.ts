import type { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import type { FieldValues, UseFormSetValue } from "react-hook-form";
import type { FormFieldProps, FormFieldTypes } from "../FormFieldTypes";

export interface useAtlantisFormFieldActionsProps
  extends Pick<
    FormFieldProps,
    | "onChange"
    | "inputRef"
    | "onEnter"
    | "readonly"
    | "onFocus"
    | "onBlur"
    | "onValidation"
    | "onEnter"
  > {
  readonly name: string;
  readonly onControllerChange: (...event: unknown[]) => void;
  readonly onControllerBlur: () => void;
  readonly type: FormFieldTypes;
  readonly setValue: UseFormSetValue<FieldValues>;
}

/**
 * Combines the actions from the props of the FormField with the actions from react-hook-form. This is used to
 * manage the form state of a field through react-hook-form while providing support for additional callbacks
 */
export function useAtlantisFormFieldActions({
  name,
  onChange,
  inputRef,
  onControllerChange,
  onControllerBlur,
  onEnter,
  readonly,
  type,
  setValue,
  onFocus,
  onBlur,
  onValidation,
}: useAtlantisFormFieldActionsProps) {
  function handleClear() {
    handleBlur();
    setValue(name, "", { shouldValidate: true });
    onChange && onChange("");
    inputRef?.current?.focus();
  }

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    let newValue: string | number;
    newValue = event.currentTarget.value;

    if (type === "number" && newValue.length > 0) {
      newValue = parseFloat(newValue);
    }

    onChange && onChange(newValue, event);
    onControllerChange(event);
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    if (!onEnter) return;
    if (event.key !== "Enter") return;
    if (event.shiftKey || event.ctrlKey) return;
    event.preventDefault();
    onEnter && onEnter(event);
  }

  function handleFocus(
    event: FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const target = event.currentTarget;

    if ((target as HTMLInputElement).select) {
      setTimeout(() => readonly && (target as HTMLInputElement).select());
    }

    onFocus && onFocus();
  }

  function handleBlur() {
    onBlur && onBlur();
    onControllerBlur();
  }

  function handleValidation(message: string) {
    onValidation && onValidation(message);
  }

  return {
    handleClear,
    handleChange,
    handleKeyDown,
    handleFocus,
    handleBlur,
    handleValidation,
  };
}
