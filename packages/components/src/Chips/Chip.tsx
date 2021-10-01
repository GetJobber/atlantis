import React from "react";
import { InternalChipProps } from "./ChipTypes";
import { useAssert } from "./useAssert";

export interface ChipProps
  extends Pick<InternalChipProps, "label" | "prefix" | "disabled" | "invalid"> {
  /**
   * The value that gets returned on the `<Chips>`'s onChange callback.
   */
  readonly value: string;
}

// Only need the component to pass in the data as a react children
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Chip(props: ChipProps) {
  // Throw error when <Chip /> gets used outside of the <Chips />
  useAssert(true, "`<Chip>` component can only be used inside `<Chips>`");

  return <></>;
}
