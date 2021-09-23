import { ReactElement } from "react";
import { ChipProps } from "./Chip";

interface ChipFoundationProps<T> {
  /**
   * Change the interaction on the chip.
   */
  readonly type?: "singleselect" | "multiselect";

  /**
   * Determines which chip gets highlighted.
   *
   * The type of the value depends on what you pass in as the selected chips or
   * the value of the chip child.
   */
  readonly selected: T | Array<T>;
  readonly children: ReactElement<ChipProps<T>>[];
  onChange(value?: T | Array<T>): void;
}

export interface ChipChoiceProps<T> extends ChipFoundationProps<T> {
  readonly type?: "singleselect";
  readonly selected: T;
  onChange(value?: T): void;
}

export interface ChipChoiceMultipleProps<T> extends ChipFoundationProps<T> {
  readonly type: "multiselect";
  readonly selected: Array<T>;
  onChange(value: Array<T>): void;
}

export type ChipsProps<T> = ChipChoiceProps<T> | ChipChoiceMultipleProps<T>;
