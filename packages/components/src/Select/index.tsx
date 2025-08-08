import React from "react";
import { Select as SelectLegacy } from "./Select";
import { SelectRebuilt } from "./Select.rebuilt";
import { SelectLegacyProps, SelectRebuiltProps } from "./Select.types";
import { OptionGroup } from "./OptionGroup";
import { Option } from "./Option";

export { Option } from "./Option";
export { OptionGroup } from "./OptionGroup";
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

Select.Option = Option;
Select.OptionGroup = OptionGroup;

export { SelectRebuiltProps, SelectLegacyProps };
