import React from "react";
import { ChipsProps } from "./ChipsTypes";
import { InternalChipChoice } from "./InternalChipChoice";
import { InternalChipChoiceMultiple } from "./InternalChipMultipleChoice";

export function Chips(props: ChipsProps) {
  if (props.type === "multiselect") {
    return <InternalChipChoiceMultiple {...props} />;
  }

  return <InternalChipChoice {...props} />;
}
