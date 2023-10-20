import React from "react";
import { ChipsProps } from "./ChipsTypes";
import { InternalChipSingleSelect } from "./InternalChipSingleSelect";
import { InternalChipMultiSelect } from "./InternalChipMultiSelect";
import { InternalChipDismissible } from "./InternalChipDismissible";

export function Chips(props: ChipsProps) {
  switch (props.type) {
    case "dismissible":
      return <InternalChipDismissible {...props} />;
    case "multiselect":
      return <InternalChipMultiSelect {...props} />;
    default:
      return <InternalChipSingleSelect {...props} />;
  }
}
