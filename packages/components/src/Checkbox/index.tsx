import React, { ForwardedRef, forwardRef } from "react";
import { Checkbox as CheckboxLegacy } from "./Checkbox";
import { Checkbox as CheckboxRebuilt } from "./Checkbox.rebuilt";
import { CheckboxProps, CheckboxRebuiltProps } from "./Checkbox.types";

export type CheckboxShimProps = CheckboxProps | CheckboxRebuiltProps;

function isNewCheckboxProps(
  props: CheckboxShimProps,
): props is CheckboxRebuiltProps {
  return props.version === 2;
}

export const Checkbox = forwardRef(function CheckboxShim(
  props: CheckboxShimProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  if (isNewCheckboxProps(props)) {
    return <CheckboxRebuilt {...props} ref={ref} />;
  }

  return <CheckboxLegacy {...props} />;
});

export type { CheckboxProps, CheckboxRebuiltProps };
