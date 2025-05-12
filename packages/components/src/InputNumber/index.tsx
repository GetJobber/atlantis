import React, { ForwardedRef, forwardRef } from "react";
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

export type InputNumberShimProps =
  | InputNumberLegacyProps
  | InputNumberRebuiltProps;

function isNewInputNumberProps(
  props: InputNumberShimProps,
): props is InputNumberRebuiltProps {
  return props.version === 2;
}

type InputNumberRef = InputNumberRebuiltRef | InputNumberLegacyRef;

export const InputNumber = forwardRef(function InputNumberShim(
  props: InputNumberShimProps,
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
