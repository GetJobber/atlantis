import React, { ForwardedRef } from "react";
import {
  InputText as InputTextLegacy,
  InputTextPropOptions,
  InputTextRef,
} from "./InputText";
import { InputTextSPAR } from "./InputText.rebuilt";
import { InputTextRebuiltProps } from "./InputText.types";

type CombinedProps = InputTextPropOptions | InputTextRebuiltProps;

export const InputText = React.forwardRef(function InputText(
  props: CombinedProps,
  ref,
) {
  if (props.version === 2) {
    return (
      <InputTextSPAR
        {...(props as InputTextRebuiltProps)}
        ref={ref as ForwardedRef<HTMLInputElement>}
      />
    );
  }

  return (
    <InputTextLegacy
      {...(props as InputTextPropOptions)}
      ref={ref as ForwardedRef<InputTextRef>}
    />
  );
});
export { InputTextRef, InputTextSPAR };
