import React, {
  Ref,
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { FormField, FormFieldProps } from "../FormField";

interface InputCurrencyProps
  extends Pick<
    FormFieldProps,
    Exclude<
      keyof FormFieldProps,
      "type" | "children" | "rows" | "keyboard" | "actionsRef"
    >
  > {
  value?: number;
  decimalPlaces?: number;
  maximumDecimalPlaces?: number;
  onChange?(newValue: number): void;
}

export interface InputCurrencyRef {
  blur(): void;
  focus(): void;
}

// eslint-disable-next-line max-statements
function InputCurrencyInternal(
  props: InputCurrencyProps,
  ref: Ref<InputCurrencyRef>,
) {
  const sanitizedNumericValue = sanitizeNumericValue(props.value);

  // Future: Set the default to the default for the currency in-use
  const minDecimalPlaces = props.decimalPlaces ?? 2;
  const maxDecimalPlaces = Math.max(
    minDecimalPlaces,
    props.maximumDecimalPlaces ?? 5,
  );

  /*
    In this component, we want to separate the value being used by parent
    code (i.e. for calculations) and the value the user is interacting with.
    If the same property is used for both, then the user is prevented from
    entering values that aren't strictly numeric, even temporarily (for
    example, the string "-" on the way to entering a negative number)
  */
  const [displayedValue, setDisplayedValue] = useState<string>(
    convertToString(sanitizedNumericValue, minDecimalPlaces, maxDecimalPlaces),
  );
  const [numericValue, setNumericValue] = useState<number>(
    sanitizedNumericValue,
  );

  useEffect(() => {
    // Only update the displayed value if the updated prop value doesn't match our current value
    if (props.value !== numericValue) {
      setDisplayedValue(
        convertToString(
          sanitizedNumericValue,
          minDecimalPlaces,
          maxDecimalPlaces,
        ),
      );
      setNumericValue(sanitizedNumericValue);
    }
  }, [props.value]);

  const inputRef = createRef<HTMLTextAreaElement | HTMLInputElement>();
  useImperativeHandle(ref, () => ({
    blur: () => {
      const input = inputRef.current;
      if (input) {
        input.blur();
      }
    },
    focus: () => {
      const input = inputRef.current;
      if (input) {
        input.focus();
      }
    },
  }));

  /*
    If a user tries to change a controlled input component, and the component
    ignores/disregards the update, the cursor will end up at the end of the
    input. This is an attempt to save the current position and restore it when
    this happens
  */
  const [savedCursorPosition, setSavedCursorPosition] = useState<
    boolean | number
  >(false);
  useEffect(() => {
    if (typeof savedCursorPosition === "number" && inputRef.current) {
      inputRef.current.selectionStart = savedCursorPosition - 1;
      inputRef.current.selectionEnd = savedCursorPosition - 1;
      setSavedCursorPosition(false);
    }
  }, [savedCursorPosition]);

  // Future: When Prefix/Postfix support is added to FormField, look up the account's currency and prefix it here
  return (
    <FormField
      {...props}
      type="text"
      keyboard="numeric"
      align="right"
      inputRef={inputRef}
      onChange={handleChange}
      onBlur={handleBlur}
      value={displayedValue}
    />
  );

  function handleChange(newValue: string) {
    setDisplayedValue(inputMask(newValue));
    if (newValue !== displayedValue && inputMask(newValue) === displayedValue) {
      setSavedCursorPosition(inputRef.current?.selectionStart ?? 0);
    }

    setNumericValue(convertToNumeric(newValue, maxDecimalPlaces));
    if (
      props.onChange &&
      convertToNumeric(newValue, maxDecimalPlaces) !== numericValue
    ) {
      props.onChange(convertToNumeric(newValue, maxDecimalPlaces));
    }
  }

  function handleBlur() {
    setDisplayedValue(
      convertToString(numericValue, minDecimalPlaces, maxDecimalPlaces),
    );

    if (props.onBlur) {
      props.onBlur();
    }
  }
}

export const InputCurrency = forwardRef(InputCurrencyInternal);

function convertToNumeric(value: string, maxDecimalPlaces: number) {
  const precision = 10 ** maxDecimalPlaces;
  const convertedValue =
    // Future: Replace with proper i18n support
    Math.round(parseFloat(inputMask(value)) * precision) / precision;

  return Number.isNaN(convertedValue) ? 0 : convertedValue;
}

function convertToString(
  value: number,
  minDecimalPlaces: number,
  maxDecimalPlaces: number,
) {
  // Future: Replace with proper i18n support e.g. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
  const targetDecimalPlaces = Math.min(
    Math.max(countDecimalPlaces(value), minDecimalPlaces),
    maxDecimalPlaces,
  );
  return value.toFixed(targetDecimalPlaces).toString();
}

function inputMask(rawValue: string) {
  // Replace any characters not "-", ".", or a decimal number (potentially i18n tweakable)
  return rawValue.replace(/[^\-.0-9]/g, "");
}

function countDecimalPlaces(value: number): number {
  if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
}

function sanitizeNumericValue(value?: number): number {
  switch (typeof value) {
    case "number":
      return value;
    default:
      return 0;
  }
}
