import React, { Ref, forwardRef, useState } from "react";
import { Platform } from "react-native";
import flow from "lodash/flow";
import identity from "lodash/identity";
import { InputText, InputTextProps, InputTextRef } from "../InputText";
import { useAtlantisI18n } from "../hooks/useAtlantisI18n";

type NumberKeyboard = "decimal-pad" | "numbers-and-punctuation";
export interface InputNumberProps
  extends Omit<
    InputTextProps,
    "keyboard" | "onChangeText" | "value" | "defaultValue"
  > {
  readonly value?: number;
  readonly defaultValue?: number;
  readonly onChange?: (newValue?: number | string | undefined) => void;
  readonly keyboard?: NumberKeyboard;
  /**
   * Used to locate this view in end-to-end tests
   */
  readonly testID?: string;
}

const NUMBER_VALIDATION_REGEX =
  /^[-+]?(([0-9]*\.[0-9]+)|([0-9]+)|([0-9]+(\.?[0-9]+)?e[-+]?[0-9]+))$/;

export const InputNumber = forwardRef(InputNumberInternal);

function InputNumberInternal(props: InputNumberProps, ref: Ref<InputTextRef>) {
  const getKeyboard = () => {
    if (Platform.OS === "ios") {
      //since we are checking for which keyboard to use here here, just implement default keyboard here instead of in params
      return props.keyboard ?? "numbers-and-punctuation";
    } else {
      return "numeric";
    }
  };
  const { t } = useAtlantisI18n();
  const handleChange = (newValue: number | string | undefined) => {
    props.onChange?.(newValue);
  };

  const { inputTransform: convertToString, outputTransform: convertToNumber } =
    useNumberTransform(props.value);
  return (
    <InputText
      {...props}
      keyboard={getKeyboard()}
      transform={{
        input: flow(convertToString, props.transform?.input || identity),
        output: flow(convertToNumber, props.transform?.output || identity),
      }}
      ref={ref}
      value={props.value?.toString()}
      defaultValue={props.defaultValue?.toString()}
      onChangeText={handleChange}
      validations={{
        pattern: {
          value: NUMBER_VALIDATION_REGEX,
          message: t("errors.notANumber"),
        },
        ...props.validations,
      }}
    />
  );
}

function hasPeriodAtEnd(value: string) {
  // matches patterns like ".", "0.", "12.", "+1.", and "-0."
  return !!value?.match(/^[-+]?[0-9]*\.$/);
}
function hasScientificNotationAtEnd(value: string) {
  // matches patterns like "1e", "+2e", "1.2e" and "-3e"
  return !!value?.match(/^[-+]?[0-9]+(\.?[0-9]+)?e$/);
}
function hasPlusMinusAtEnd(value: string) {
  // matches "+" and "-"
  return !!value?.match(/^[-+]+$/);
}

function hasZeroDecimalAtEnd(value: string) {
  // matches patterns like "0.0", "+0.00000", "-3.00000", "2.100", ".0", and ".00000"
  return !!value?.match(/^[-+]?[0-9]*\.[0-9]*0+$/);
}

export function shouldShowUserValue(value: string): boolean {
  const specialCasesFn = [
    hasPeriodAtEnd,
    hasScientificNotationAtEnd,
    hasPlusMinusAtEnd,
    hasZeroDecimalAtEnd,
  ];
  const isSpecial = (v: string) =>
    specialCasesFn.reduce((acc, fn) => acc || fn(v), false);
  return isSpecial(value);
}

export function useNumberTransform(controlledValue: number | undefined): {
  inputTransform: (internalValue?: number) => string | undefined;
  outputTransform: (value: string) => string | number;
} {
  const [typedValue, setTypedValue] = useState<string>(
    controlledValue?.toString() || "",
  );

  const convertToNumber = (newValue: string) => {
    setTypedValue(newValue);
    if (newValue?.match?.(NUMBER_VALIDATION_REGEX)) {
      return parseFloat(newValue);
    }
    return newValue;
  };

  const convertToString = (internalValue: number | undefined) => {
    if (shouldShowUserValue(typedValue)) {
      return typedValue;
    }
    return internalValue?.toString() || undefined;
  };

  return {
    inputTransform: convertToString,
    outputTransform: convertToNumber,
  };
}
