import React, { ReactElement } from "react";
import { ChipChoice } from "./ChipChoice";

interface ChipsProps {
  readonly type: "choice" | "multiple" | "dismissible";
  readonly children: ReactElement[];
  readonly selected: string;
  onChange(value: string): void;
}

export function Chips(props: ChipsProps) {
  return <ChipChoice {...props} />;
}
