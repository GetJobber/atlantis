/**
 * Controls the visibility of the clear button on the input.
 * - "never": never show the clear button
 * - "while-editing": show while the field has value and is focused
 * - "always": show when the field has value, even when blurred
 */
export type Clearable = "never" | "while-editing" | "always";

interface UseShowClearParameters {
  clearable: Clearable;
  multiline: boolean;
  focused: boolean;
  hasValue: boolean;
  disabled?: boolean;
  readonly?: boolean;
}

export function useShowClear({
  clearable,
  multiline,
  focused,
  hasValue,
  readonly,
  disabled = false,
}: UseShowClearParameters): boolean | undefined {
  if (multiline && clearable !== "never") {
    throw new Error("Multiline inputs can not be clearable");
  }

  // Do not show if there is no value
  if (!hasValue || clearable === "never" || disabled || readonly) {
    return false;
  }

  switch (clearable) {
    case "while-editing":
      return focused;
    case "always":
      return true;
  }
}
