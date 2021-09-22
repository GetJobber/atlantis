import React from "react";
import { InternalChipProps } from "./InternalChip";

export interface ChipProps
  extends Pick<InternalChipProps, "label" | "prefix" | "disabled" | "invalid"> {
  readonly value: string;
}

// Only need the component to pass in the data as a react children
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Chip = (props: ChipProps) => <></>;
