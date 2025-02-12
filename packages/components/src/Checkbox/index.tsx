import React from "react";
import { Checkbox as CheckboxLegacy } from "./Checkbox";
import { Checkbox as CheckboxRebuilt } from "./Checkbox.rebuilt";
import { CheckboxProps, CheckboxRebuiltProps } from "./Checkbox.types";

type CheckboxShimProps = CheckboxProps | CheckboxRebuiltProps;

function isNewCheckboxProps(
  props: CheckboxShimProps,
): props is CheckboxRebuiltProps {
  return props.version === 2;
}

export function Checkbox(props: CheckboxShimProps) {
  if (isNewCheckboxProps(props)) {
    return <CheckboxRebuilt {...props} />;
  }

  return <CheckboxLegacy {...props} />;
}

export type { CheckboxProps, CheckboxRebuiltProps };
