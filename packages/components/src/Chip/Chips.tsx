import React, { ReactElement } from "react";
import { ChipProps } from "./Chip";
import { InternalChipChoice } from "./InternalChipChoice";
import { InternalChipChoiceMultiple } from "./InternalChipMultipleChoice";

interface ChipsFoundationProps {
  readonly type: "choice" | "multiple" | "dismissible";
  readonly children: ReactElement<ChipProps>[];
  readonly selected: string | string[];
  onChange(value: string | string[]): void;
}

interface ChipChoiceProps extends ChipsFoundationProps {
  readonly type: "choice";
  readonly selected: string;
  onChange(value: string): void;
}

interface ChipChoiceMultipleProps extends ChipsFoundationProps {
  readonly type: "multiple";
  readonly selected: string[];
  onChange(value: string[]): void;
}

type ChipsProps = ChipChoiceProps | ChipChoiceMultipleProps;

export function Chips(props: ChipsProps) {
  if (props.type === "multiple") {
    return <InternalChipChoiceMultiple {...props} />;
  }
  return <InternalChipChoice {...props} />;
}
