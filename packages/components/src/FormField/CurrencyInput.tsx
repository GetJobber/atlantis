import React, {
  ChangeEvent,
  FocusEvent,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { TextInput } from "./TextInput";
import { InputCurrencyProps, InputCurrencyRef } from "./Types";

// eslint-disable-next-line max-statements
function InputCurrencyInternal(
  props: InputCurrencyProps,
  ref: Ref<InputCurrencyRef>,
) {
  const sanitizedNumericValue = Number(props.value ?? 0);
  const internalRef = useRef<HTMLInputElement>(null);
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
    if (sanitizedNumericValue !== numericValue) {
      setDisplayedValue(
        convertToString(
          sanitizedNumericValue,
          minDecimalPlaces,
          maxDecimalPlaces,
        ),
      );
      setNumericValue(sanitizedNumericValue);
    }
  }, [sanitizedNumericValue]);

  const refMethods = {
    blur: () => {
      const input = internalRef.current;

      if (input) {
        input.blur();
      }
    },
    focus: () => {
      const input = internalRef.current;

      if (input) {
        input.focus();
      }
    },
  };

  useImperativeHandle(ref, () => refMethods, [refMethods]);

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
    if (typeof savedCursorPosition === "number" && internalRef.current) {
      internalRef.current.selectionStart = savedCursorPosition - 1;
      internalRef.current.selectionEnd = savedCursorPosition - 1;
      setSavedCursorPosition(false);
    }
  }, [savedCursorPosition]);

  return (
    <div style={{ display: "flex" }}>
      <TextInput
        {...props}
        prefix={props.currencySymbol ?? "$"}
        ref={internalRef}
        onChange={handleChange}
        onBlur={handleBlur}
        value={displayedValue}
      />
    </div>
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target?.value;
    setDisplayedValue(inputMask(newValue));

    if (newValue !== displayedValue && inputMask(newValue) === displayedValue) {
      setSavedCursorPosition(internalRef.current?.selectionStart ?? 0);
    }

    setNumericValue(convertToNumeric(newValue, maxDecimalPlaces));

    if (
      props.onChange &&
      convertToNumeric(newValue, maxDecimalPlaces) !== numericValue
    ) {
      props.onChange(e);
    }
  }

  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    setDisplayedValue(
      convertToString(numericValue, minDecimalPlaces, maxDecimalPlaces),
    );

    if (props.onBlur) {
      props.onBlur(e);
    }
  }
}

export const CurrencyInput = forwardRef(InputCurrencyInternal);

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
