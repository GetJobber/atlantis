import React, { forwardRef } from "react";
import { CheckboxLegacy } from "./Checkbox";
import { CheckboxRebuilt } from "./Checkbox.rebuilt";
import type {
  CheckboxLegacyProps,
  CheckboxRebuiltProps,
} from "./Checkbox.types";

type CheckboxShimProps = CheckboxLegacyProps | CheckboxRebuiltProps;

function isNewCheckboxProps(
  props: CheckboxShimProps,
): props is CheckboxRebuiltProps {
  return props.version === 2;
}

export const Checkbox = forwardRef(function CheckboxShim(
  props: CheckboxShimProps,
  ref: React.Ref<HTMLInputElement>,
) {
  if (isNewCheckboxProps(props)) {
    return <CheckboxRebuilt {...props} ref={ref} />;
  }

  return <CheckboxLegacy {...props} />;
});

Checkbox.displayName = "Checkbox";

export type { CheckboxLegacyProps, CheckboxRebuiltProps };
