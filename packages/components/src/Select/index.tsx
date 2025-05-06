import React from "react";
import { Select as SelectLegacy } from "./Select";
import { SelectRebuilt } from "./Select.rebuilt";
import {
  type SelectLegacyProps,
  type SelectRebuiltProps,
} from "./Select.types";

export { Option } from "./Option";
export type SelectShimProps = SelectLegacyProps | SelectRebuiltProps;

function isNewSelectProps(props: SelectShimProps): props is SelectRebuiltProps {
  return props.version === 2;
}

export function Select(props: SelectShimProps) {
  if (isNewSelectProps(props)) {
    return <SelectRebuilt {...props} />;
  } else {
    return <SelectLegacy {...props} />;
  }
}

export { SelectRebuiltProps, SelectLegacyProps };
