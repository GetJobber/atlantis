import React, { ForwardedRef, forwardRef } from "react";
import { Select as SelectLegacy } from "./Select";
import { SelectRebuilt } from "./Select.rebuilt";
import { SelectProps, SelectRebuiltProps } from "./Select.types";

export { Option } from "./Option";
export type SelectShimProps = SelectProps | SelectRebuiltProps;

function isNewSelectProps(props: SelectShimProps): props is SelectRebuiltProps {
  return props.version === 2;
}

export const Select = forwardRef(function SelectShim(
  props: SelectShimProps,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  if (isNewSelectProps(props)) {
    return (
      <SelectRebuilt {...props} ref={ref as ForwardedRef<HTMLSelectElement>} />
    );
  } else {
    return <SelectLegacy {...props} />;
  }
});
