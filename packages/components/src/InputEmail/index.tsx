import React, { ForwardedRef, forwardRef } from "react";
import { InputEmail as InputEmailLegacy } from "./InputEmail";
import { InputEmailRebuilt } from "./InputEmail.rebuilt";
import {
  type InputEmailLegacyProps,
  type InputEmailRebuiltProps,
} from "./InputEmail.types";

export type InputEmailShimProps =
  | InputEmailRebuiltProps
  | InputEmailLegacyProps;

function isNewInputEmailProps(
  props: InputEmailShimProps,
): props is InputEmailRebuiltProps {
  return props.version === 2;
}

export const InputEmail = forwardRef(function InputEmailShim(
  props: InputEmailShimProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  if (isNewInputEmailProps(props)) {
    return (
      <InputEmailRebuilt
        {...props}
        ref={ref as ForwardedRef<HTMLInputElement>}
      />
    );
  } else {
    return <InputEmailLegacy {...props} />;
  }
});
export { InputEmailRebuiltProps, InputEmailLegacyProps };
