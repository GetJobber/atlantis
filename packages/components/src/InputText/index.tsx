import React, { ForwardedRef, forwardRef } from "react";
import { InputText as InputTextLegacy } from "./InputText";
import { InputTextSPAR } from "./InputText.rebuilt";
import {
  InputTextRebuiltProps,
  InputTextRef,
  LegacyInputTextProps,
} from "./InputText.types";

export type InputTextShimProps = LegacyInputTextProps | InputTextRebuiltProps;
export type InputTextProps = LegacyInputTextProps;

function isNewInputTextProps(
  props: InputTextShimProps,
): props is InputTextRebuiltProps {
  return props.version === 2;
}

export const InputText = forwardRef(function InputTextShim(
  props: InputTextShimProps,
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

export { InputTextRef, InputTextRebuiltProps };
