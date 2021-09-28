import React from "react";
import { ChipsProps } from "./ChipsTypes";
import { InternalChipSingleSelect } from "./InternalChipSingleSelect";
import { InternalChipMultiSelect } from "./InternalChipMultiSelect";
import { InternalChipDimissible } from "./InternalChipDimissible";

export function Chips(props: ChipsProps) {
  switch (props.type) {
    case "dismissible":
      return <InternalChipDimissible {...props} />;
    case "multiselect":
      return <InternalChipMultiSelect {...props} />;
    default:
      return <InternalChipSingleSelect {...props} />;
  }
}
