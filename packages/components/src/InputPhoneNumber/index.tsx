import React from "react";
import {
  InputPhoneNumberProps,
  InputPhoneNumberRebuiltProps,
} from "./InputPhoneNumber.types";
import { InputPhoneNumberRebuilt } from "./InputPhoneNumber.rebuilt";
import { InputPhoneNumber as InputPhoneNumberLegacy } from "./InputPhoneNumber";

export type InputPhoneNumberShimProps =
  | InputPhoneNumberProps
  | InputPhoneNumberRebuiltProps;

function isNewInputPhoneNumberProps(
  props: InputPhoneNumberShimProps,
): props is InputPhoneNumberRebuiltProps {
  return props.version === 2;
}

export function InputPhoneNumber(props: InputPhoneNumberShimProps) {
  if (isNewInputPhoneNumberProps(props)) {
    return <InputPhoneNumberRebuilt {...props} />;
  } else {
    return <InputPhoneNumberLegacy {...props} />;
  }
}
