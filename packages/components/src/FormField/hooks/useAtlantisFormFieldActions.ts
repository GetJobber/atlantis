import { ChangeEvent, FocusEvent, KeyboardEvent } from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

/**
 * Generates the actions for a form field. Combines the actions from the props of the form field with the actions from react-hook-form
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
}: {
  name: string;
  onChange?:
    | ((
        newValue: string | number | boolean | Date,
        event?: ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
      ) => void)
    | undefined;
  inputRef?: React.RefObject<HTMLInputElement>;
  onControllerChange: (...event: unknown[]) => void;
  onControllerBlur: () => void;
  onEnter?: ((event: React.KeyboardEvent) => void) | undefined;
  readonly?: boolean;
  type: string;
  setValue: UseFormSetValue<FieldValues>;
  onFocus?: (() => void) | undefined;
  onBlur?: (() => void) | undefined;
  onValidation?: ((message: string) => void) | undefined;
}) {
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
