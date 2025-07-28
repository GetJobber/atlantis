import React, { type ForwardedRef, forwardRef } from "react";
import { InputNumberRebuilt } from "./InputNumber.rebuilt";
import {
  InputNumber as InputNumberLegacy,
  InputNumberProps as InputNumberLegacyProps,
  InputNumberRef as InputNumberLegacyRef,
} from "./InputNumber";
import {
  InputNumberRebuiltProps,
  InputNumberRebuiltRef,
} from "./InputNumber.rebuilt.types";

export type InputNumberProps =
  | ({
      version: 2;
    } & InputNumberRebuiltProps)
  | ({
      version?: 1;
    } & InputNumberLegacyProps);

function isNewInputNumberProps(
  props: InputNumberProps,
): props is InputNumberRebuiltProps {
  return props.version === 2;
}

type InputNumberRef = InputNumberRebuiltRef | InputNumberLegacyRef;

export const InputNumber = forwardRef(function InputNumberShim(
  props: InputNumberProps,
  ref: ForwardedRef<InputNumberRef>,
) {
  if (isNewInputNumberProps(props)) {
    return (
      <InputNumberRebuilt
        {...props}
        ref={ref as ForwardedRef<InputNumberRebuiltRef>}
      />
    );
  } else {
    return (
      <InputNumberLegacy
        {...props}
        ref={ref as ForwardedRef<InputNumberLegacyRef>}
      />
    );
  }
});

export { InputNumberRef, InputNumberRebuiltProps, InputNumberLegacyProps };
