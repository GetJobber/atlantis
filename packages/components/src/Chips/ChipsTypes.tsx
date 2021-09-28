import { MouseEvent, ReactElement } from "react";
import { XOR } from "ts-xor";
import { ChipProps } from "./Chip";

interface ChipFoundationProps {
  readonly children: ReactElement<ChipProps>[];

  /**
   * Change the interaction on the chip.
   */
  readonly type?: "singleselect" | "multiselect" | "dismissible";

  /**
   * Determines which chip gets highlighted.
   */
  readonly selected?: string | string[];

  /**
   * Callback whenever a chip is clicked. This returns a new value of
   * selected chips.
   *
   * @param value
   */
  onChange(value?: string | string[]): void;

  /**
   * Callback when a specific chip is clicked
   *
   * @param event
   * @param clickedChipValue - The value of the chip that was clicked
   */
  onClick?(
    event: MouseEvent<HTMLDivElement | HTMLInputElement | HTMLButtonElement>,
    clickedChipValue?: string,
  ): void;
}

export interface ChipSingleSelectProps extends ChipFoundationProps {
  readonly type?: "singleselect";
  readonly selected?: string;
  onChange(value?: string): void;

  /**
   * The Chip's radio input name.
   *
   * @link https://www.w3schools.com/tags/att_input_name.asp
   */
  readonly name?: string;
}

export interface ChipMultiSelectProps extends ChipFoundationProps {
  readonly type: "multiselect";
  readonly selected: string[];
  onChange(value: string[]): void;
}

export type ChipsProps = XOR<ChipSingleSelectProps, ChipMultiSelectProps>;
