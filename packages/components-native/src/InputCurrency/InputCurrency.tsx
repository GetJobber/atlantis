import React, { useState } from "react";
import { FormatNumberOptions, useIntl } from "react-intl";
import { Platform } from "react-native";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import {
  NUMBER_VALIDATION_REGEX,
  checkLastChar,
  configureDecimal,
  convertToNumber,
  isValidNumber,
  limitInputWholeDigits,
  parseGivenInput,
} from "./utils";
import { messages } from "./messages";
import { useAtlantisContext } from "../AtlantisContext";
import { InputText, InputTextProps } from "../InputText";
import { useFormController } from "../hooks/useFormController";

export interface InputCurrencyProps
  extends Omit<
    InputTextProps,
    "keyboard" | "onChangeText" | "value" | "defaultValue"
  > {
  /**
   * Whether to display the user's currency symbol or not
   * Default value is true
   */
  readonly showCurrencySymbol?: boolean;

  /**
   * The minimum decimal places for the currency number
   * Default value is 2
   */
  readonly decimalPlaces?: number;

  /**
   * The maximum decimal places for the currency number
   * Default value is 5
   */
  readonly maxDecimalPlaces?: number;

  /**
   * The maximum length of the input
   * Default value is 10
   */
  readonly maxLength?: number;

  onChange?(newValue?: number | string | undefined): void;
  value?: number;
  defaultValue?: number;
  keyboard?: "decimal-pad" | "numbers-and-punctuation";
}
export const getInternalValue = (
  props: InputCurrencyProps,
  field: ControllerRenderProps<FieldValues, string>,
  formatNumber: (
    value: number | bigint,
    opts?: FormatNumberOptions | undefined,
  ) => string,
): string => {
  if (!props.value && !field.value) return "";
  return (
    props.value?.toString() ??
    formatNumber(field.value, {
      maximumFractionDigits: props.maxDecimalPlaces,
    })
  );
};

const getKeyboard = (props: InputCurrencyProps) => {
  if (Platform.OS === "ios") {
    //since we are checking for which keyboard to use here, just implement default keyboard here instead of in params
    return props.keyboard ?? "numbers-and-punctuation";
  } else {
    return "numeric";
  }
};

export function InputCurrency(props: InputCurrencyProps): JSX.Element {
  const {
    showCurrencySymbol = true,
    maxDecimalPlaces = 5,
    decimalPlaces = 2,
    maxLength = 10,
  } = props;
  const intl = useIntl();
  const { floatSeparators, currencySymbol } = useAtlantisContext();

  const { field } = useFormController({
    name: props.name,
    value: props.value,
  });
  const internalValue = getInternalValue(props, field, intl.formatNumber);
  const [displayValue, setDisplayValue] = useState<string | undefined>(
    internalValue,
  );

  const setOnChangeAndDisplayValues = (
    onChangeValue: number | string | undefined,
    valueToDisplay: string | undefined,
  ) => {
    props.onChange?.(onChangeValue);
    setDisplayValue(valueToDisplay);
  };

  const checkDecimalAndI18nOfDisplayValue = (
    numberedValue: number,
    decimalNumbers: string,
    decimalCount: number,
  ) => {
    const transformedValue = limitInputWholeDigits(numberedValue, maxLength);
    const stringValue =
      decimalNumbers !== ""
        ? transformedValue.toString() + "." + decimalNumbers.slice(1)
        : transformedValue.toString();
    if (checkLastChar(stringValue)) {
      const roundedDecimal = configureDecimal(
        decimalCount,
        maxDecimalPlaces,
        stringValue,
        decimalPlaces,
      );
      const internationalizedValueToDisplay = intl.formatNumber(
        roundedDecimal,
        {
          maximumFractionDigits: maxDecimalPlaces,
        },
      );
      setOnChangeAndDisplayValues(
        roundedDecimal,
        internationalizedValueToDisplay,
      );
    } else {
      const internationalizedValueToDisplay =
        intl.formatNumber(transformedValue, {
          maximumFractionDigits: maxDecimalPlaces,
        }) + decimalNumbers;
      setOnChangeAndDisplayValues(
        transformedValue.toString() + "." + decimalNumbers.slice(1),
        internationalizedValueToDisplay,
      );
    }
  };

  const handleChange = (newValue: string | undefined) => {
    const [decimalCount, wholeIntegerValue, decimalNumbers] = parseGivenInput(
      newValue,
      floatSeparators.decimal,
    );

    const numberedValue = wholeIntegerValue
      ? convertToNumber(wholeIntegerValue)
      : wholeIntegerValue;

    if (isValidNumber(numberedValue) && typeof numberedValue === "number") {
      checkDecimalAndI18nOfDisplayValue(
        numberedValue,
        decimalNumbers,
        decimalCount,
      );
    } else {
      const value = numberedValue?.toString() + decimalNumbers;
      setOnChangeAndDisplayValues(value, value);
    }
  };

  const { formatMessage } = useIntl();

  return (
    <>
      <InputText
        {...props}
        prefix={showCurrencySymbol ? { label: currencySymbol } : undefined}
        keyboard={getKeyboard(props)}
        value={props.value?.toString() || displayValue}
        defaultValue={props.defaultValue?.toString()}
        onChangeText={handleChange}
        transform={{
          output: val => {
            return val
              ?.split(floatSeparators.group)
              .join("")
              .replace(floatSeparators.decimal, ".");
          },
        }}
        validations={{
          pattern: {
            value: NUMBER_VALIDATION_REGEX,
            message: formatMessage(messages.notANumberError),
          },
          ...props.validations,
        }}
        onBlur={() => {
          props.onBlur?.();
          if (
            field.value === 0 ||
            field.value === "" ||
            field.value === undefined
          ) {
            setDisplayValue("0");
          }
        }}
      />
    </>
  );
}
