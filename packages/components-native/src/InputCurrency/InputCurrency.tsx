import React, { useState } from "react";
import type { FormatNumberOptions } from "react-intl";
import { useIntl } from "react-intl";
import { Platform } from "react-native";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";
import {
  NUMBER_VALIDATION_REGEX,
  checkLastChar,
  configureDecimal,
  convertToNumber,
  isValidNumber,
  limitInputWholeDigits,
  parseGivenInput,
} from "./utils";
import { useAtlantisContext } from "../AtlantisContext";
import type { InputTextProps } from "../InputText";
import { InputText } from "../InputText";
import { useFormController } from "../hooks/useFormController";
import { useAtlantisI18n } from "../hooks/useAtlantisI18n";

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
  readonly value?: number;
  readonly defaultValue?: number;
  readonly keyboard?: "decimal-pad" | "numbers-and-punctuation";
}

export const getInternalValue = (
  props: InputCurrencyProps,
  field: ControllerRenderProps<FieldValues, string>,
  formatNumber: (
    value: number,
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

const computeDisplayFromNumericInput = (
  numberedValue: number,
  decimalNumbers: string,
  decimalCount: number,
  maxLength: number,
  maxDecimalPlaces: number,
  decimalPlaces: number,
  formatNumber: (
    value: number,
    opts?: FormatNumberOptions | undefined,
  ) => string,
): {
  onChangeValue: number | string;
  displayValue: string;
} => {
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
    const internationalizedValueToDisplay = formatNumber(roundedDecimal, {
      maximumFractionDigits: maxDecimalPlaces,
    });

    return {
      onChangeValue: roundedDecimal,
      displayValue: internationalizedValueToDisplay,
    };
  } else {
    const internationalizedValueToDisplay =
      formatNumber(transformedValue, {
        maximumFractionDigits: maxDecimalPlaces,
      }) + decimalNumbers;

    return {
      onChangeValue:
        transformedValue.toString() + "." + decimalNumbers.slice(1),
      displayValue: internationalizedValueToDisplay,
    };
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

  const handleChange = (newValue: string | undefined) => {
    const [decimalCount, wholeIntegerValue, decimalNumbers] = parseGivenInput(
      newValue,
      floatSeparators.decimal,
    );

    const numberedValue = wholeIntegerValue
      ? convertToNumber(wholeIntegerValue)
      : wholeIntegerValue;

    if (isValidNumber(numberedValue) && typeof numberedValue === "number") {
      const result = computeDisplayFromNumericInput(
        numberedValue,
        decimalNumbers,
        decimalCount,
        maxLength,
        maxDecimalPlaces,
        decimalPlaces,
        intl.formatNumber,
      );
      const { onChangeValue, displayValue: valueToDisplay } = result;
      props.onChange?.(onChangeValue);
      setDisplayValue(valueToDisplay);
    } else {
      const value = numberedValue?.toString() + decimalNumbers;
      props.onChange?.(value);
      setDisplayValue(value);
    }
  };

  const { t } = useAtlantisI18n();

  const defaultValidations = {
    pattern: {
      value: NUMBER_VALIDATION_REGEX,
      message: t("errors.notANumber"),
    },
  } as const;
  const mergedValidations = props.validations
    ? Object.assign({}, defaultValidations, props.validations)
    : defaultValidations;

  return (
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
      validations={mergedValidations}
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
  );
}
