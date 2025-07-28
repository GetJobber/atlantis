import React, { ForwardedRef, forwardRef } from "react";
import {
  type InputPhoneNumberLegacyProps,
  type InputPhoneNumberRebuiltProps,
} from "./InputPhoneNumber.types";
import { InputPhoneNumberRebuilt } from "./InputPhoneNumber.rebuilt";
import { InputPhoneNumber as InputPhoneNumberLegacy } from "./InputPhoneNumber";

export type InputPhoneNumberShimProps =
  | InputPhoneNumberLegacyProps
  | InputPhoneNumberRebuiltProps;

function isNewInputPhoneNumberProps(
  props: InputPhoneNumberShimProps,
): props is InputPhoneNumberRebuiltProps {
  return props.version === 2;
}

export const InputPhoneNumber = forwardRef(function InputPhoneNumberShim(
  props: InputPhoneNumberShimProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  if (isNewInputPhoneNumberProps(props)) {
    return <InputPhoneNumberRebuilt {...props} ref={ref} />;
  } else {
    return <InputPhoneNumberLegacy {...props} />;
  }
});

export { InputPhoneNumberLegacyProps, InputPhoneNumberRebuiltProps };
