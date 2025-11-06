import type { ForwardedRef } from "react";
import React, { forwardRef } from "react";
import type {
  InputTimeLegacyProps,
  InputTimeRebuiltProps,
} from "./InputTime.types";
import { InputTimeRebuilt } from "./InputTime.rebuilt";
import { InputTime as InputTimeLegacy } from "./InputTime";

export type InputTimeShimProps = InputTimeLegacyProps | InputTimeRebuiltProps;

function isNewInputTimeProps(
  props: InputTimeShimProps,
): props is InputTimeRebuiltProps {
  return props.version === 2;
}

export const InputTime = forwardRef(function InputTimeShim(
  props: InputTimeShimProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  if (isNewInputTimeProps(props)) {
    return <InputTimeRebuilt {...props} ref={ref} />;
  } else {
    return <InputTimeLegacy {...props} />;
  }
});
