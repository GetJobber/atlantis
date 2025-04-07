import React from "react";
import { CheckboxLegacy } from "./Checkbox";
import { CheckboxRebuilt } from "./Checkbox.rebuilt";
import { CheckboxLegacyProps, CheckboxRebuiltProps } from "./Checkbox.types";

type CheckboxShimProps = CheckboxLegacyProps | CheckboxRebuiltProps;

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

export type { CheckboxLegacyProps, CheckboxRebuiltProps };
