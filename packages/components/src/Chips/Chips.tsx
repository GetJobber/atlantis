import React from "react";
import { ChipsProps } from "./ChipsTypes";
import { InternalChipSingleSelect } from "./InternalChipSingleSelect";
import { InternalChipMultiSelect } from "./InternalChipMultiSelect";

export function Chips(props: ChipsProps) {
  if (props.type === "multiselect") {
    return <InternalChipMultiSelect {...props} />;
  }

  return <InternalChipSingleSelect {...props} />;
}
