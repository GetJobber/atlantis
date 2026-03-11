/* eslint-disable import/no-deprecated */
import React from "react";
import type {
  ChipDismissibleProps,
  ChipMultiSelectProps,
  ChipSingleSelectProps,
  ChipsProps,
} from "./ChipsTypes";
import { InternalChipSingleSelect } from "./InternalChipSingleSelect";
import { InternalChipMultiSelect } from "./InternalChipMultiSelect";
import { InternalChipDismissible } from "./InternalChipDismissible";

/**
 * @deprecated Use Autocomplete with the "multiple" prop instead of dismissible Chips.
 */
export function Chips(props: ChipDismissibleProps): React.JSX.Element;
export function Chips(props: ChipSingleSelectProps): React.JSX.Element;
export function Chips(props: ChipMultiSelectProps): React.JSX.Element;

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
