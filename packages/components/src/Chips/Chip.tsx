import React from "react";
import type { InternalChipProps } from "./ChipTypes";

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
  //eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}
