import React, { ForwardedRef, forwardRef } from "react";
import { InputDate as InputDateLegacy } from "./InputDate";
import { InputDateRebuilt } from "./InputDate.rebuilt";
import {
  InputDateProps as InputDateLegacyProps,
  InputDateRebuiltProps,
} from "./InputDate.types";

export type InputDateProps = InputDateLegacyProps | InputDateRebuiltProps;

function isNewInputDateProps(
  props: InputDateProps,
): props is InputDateRebuiltProps {
  return props.version === 2;
}

export const InputDate = forwardRef(function InputDateShim(
  props: InputDateProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  if (isNewInputDateProps(props)) {
    return <InputDateRebuilt {...props} ref={ref} />;
  } else {
    return <InputDateLegacy {...props} />;
  }
});
