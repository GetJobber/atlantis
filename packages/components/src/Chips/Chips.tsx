import React from "react";
import { ChipsProps } from "./ChipsTypes";
import { InternalChipSingleSelect } from "./InternalChipSingleSelect";
import { InternalChipMultiSelect } from "./InternalChipMultiSelect";
import { useAssert } from "./useAssert";

export function Chips(props: ChipsProps) {
  assertValues();

  if (props.type === "multiselect") {
    return <InternalChipMultiSelect {...props} />;
  }

  return <InternalChipSingleSelect {...props} />;

  function assertValues() {
    const chipValues = props.children.map(chip => chip.props.value);
    useAssert(
      chipValues.some(val => typeof val !== typeof chipValues[0]),
      `<Chip /> value prop should match to either all strings or all numbers. But, not a mix of both. Values: ${JSON.stringify(
        chipValues,
      )}`,
    );
  }
}
