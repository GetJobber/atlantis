import type { ForwardedRef } from "react";
import React, { forwardRef } from "react";
import { Select as SelectLegacy } from "./Select";
import { SelectRebuilt } from "./Select.rebuilt";
import { Option } from "./Option";
import { OptionGroup } from "./OptionGroup";
import {
  type SelectLegacyProps,
  type SelectRebuiltProps,
} from "./Select.types";

export { Option } from "./Option";
export type SelectShimProps = SelectLegacyProps | SelectRebuiltProps;

function isNewSelectProps(props: SelectShimProps): props is SelectRebuiltProps {
  return props.version === 2;
}

type SelectComponent = React.ForwardRefExoticComponent<
  SelectShimProps & React.RefAttributes<HTMLSelectElement>
> & {
  Option: typeof Option;
  OptionGroup: typeof OptionGroup;
};

const SelectBase = forwardRef(function SelectShim(
  props: SelectShimProps,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  if (isNewSelectProps(props)) {
    return <SelectRebuilt {...props} ref={ref} />;
  } else {
    return <SelectLegacy {...props} />;
  }
});

export const Select = SelectBase as SelectComponent;
Select.Option = Option;
Select.OptionGroup = OptionGroup;

export type { SelectRebuiltProps, SelectLegacyProps };
