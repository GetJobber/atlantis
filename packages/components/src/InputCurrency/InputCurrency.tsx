import React from "react";
import { InputNumber, InputNumberRebuiltProps } from "../InputNumber";

/**
 * Experimental and temporary version of the InputCurrency component.
 * Do not modify this code unless you have talked with UXF first.
 */

export interface InputCurrencyProps
  extends Omit<InputNumberRebuiltProps, "version"> {}

const defaultFormatOptions: Intl.NumberFormatOptions = {
  currency: "USD",
  currencyDisplay: "symbol",
  style: "currency",
};

export const InputCurrency = React.forwardRef<
  HTMLInputElement,
  InputCurrencyProps
>((props, forwardedRef) => {
  const { formatOptions = defaultFormatOptions, ...inputNumberProps } = props;

  return (
    <InputNumber
      {...inputNumberProps}
      version={2}
      ref={forwardedRef}
      formatOptions={formatOptions}
    />
  );
});
InputCurrency.displayName = "InputCurrency";
