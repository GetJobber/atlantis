import React, { ForwardedRef, forwardRef } from "react";
import { InputText as InputTextLegacy } from "./InputText";
import { InputTextSPAR } from "./InputText.rebuilt";
import {
  InputTextPropOptions,
  InputTextRebuiltProps,
  InputTextRef,
} from "./InputText.types";

export type InputTextProps = InputTextPropOptions | InputTextRebuiltProps;

function isNewInputTextProps(
  props: InputTextProps,
): props is InputTextRebuiltProps {
  return props.version === 2;
}

export const InputText = forwardRef(function InputTextShim(
  props: InputTextProps,
  ref: ForwardedRef<HTMLTextAreaElement | HTMLInputElement | InputTextRef>,
) {
  if (isNewInputTextProps(props)) {
    return (
      <InputTextSPAR
        {...props}
        ref={ref as ForwardedRef<HTMLTextAreaElement | HTMLInputElement>}
      />
    );
  } else {
    return (
      <InputTextLegacy {...props} ref={ref as ForwardedRef<InputTextRef>} />
    );
  }
});

export { InputTextRef };