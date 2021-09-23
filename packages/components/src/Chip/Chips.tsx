import React, { ReactElement } from "react";
import { InternalChipChoice } from "./InternalChipChoice";

interface ChipsProps {
  readonly type: "choice" | "multiple" | "dismissible";
  readonly children: ReactElement[];
  readonly selected: string;
  onChange(value: string): void;
}

export function Chips(props: ChipsProps) {
  return <InternalChipChoice {...props} />;
}
