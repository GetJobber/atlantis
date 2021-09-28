import React from "react";
import { ChipsProps } from "./ChipsTypes";
import { InternalChipSingleSelect } from "./InternalChipSingleSelect";
import { InternalChipMultiSelect } from "./InternalChipMultiSelect";

export function Chips<T>(props: ChipsProps<T>) {
  if (props.type === "multiselect") {
    return <InternalChipMultiSelect {...props} />;
  }

  return <InternalChipSingleSelect {...props} />;
}
