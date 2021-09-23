import React from "react";
import { ChipsProps } from "./ChipsTypes";
import { InternalChipChoice } from "./InternalChipChoice";
import { InternalChipChoiceMultiple } from "./InternalChipMultipleChoice";

export function Chips<T>(props: ChipsProps<T>) {
  if (props.type === "multiple") {
    return <InternalChipChoiceMultiple {...props} />;
  }

  return <InternalChipChoice<T> {...props} />;
}
