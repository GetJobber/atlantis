import { ReactElement } from "react";
import { XOR } from "ts-xor";
import { ChipProps } from "./Chip";

interface ChipFoundationProps<T> {
  readonly children: ReactElement<ChipProps<T>>[];

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
  readonly selected: T | T[];

  /**
   * Callback whenever a chip is clicked. This returns a new value of
   * selected chips.
   *
   * @param value
   */
  onChange(value?: T | T[]): void;

  /**
   * Callback when a specific chip is clicked
   *
   * @param event
   * @param clickedChipValue - The value of the chip that was clicked
   */
  onClickChip?(
    event: React.MouseEvent<HTMLElement>,
    clickedChipValue?: T,
  ): void;
}

export interface ChipSingleSelectProps<T> extends ChipFoundationProps<T> {
  readonly type?: "singleselect";
  readonly selected: T;
  onChange(value?: T): void;

  /**
   * The Chip's radio input name.
   *
   * @link https://www.w3schools.com/tags/att_input_name.asp
   */
  readonly name?: string;
}

export interface ChipMultiSelectProps<T> extends ChipFoundationProps<T> {
  readonly type: "multiselect";
  readonly selected: T[];
  onChange(value: T[]): void;
}

export type ChipsProps<T> = XOR<
  ChipSingleSelectProps<T>,
  ChipMultiSelectProps<T>
>;
