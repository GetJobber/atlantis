import { ReactElement } from "react";
import { XOR } from "ts-xor";
import { ChipProps } from "./Chip";

interface ChipFoundationProps {
  readonly children: ReactElement<ChipProps>[];

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
  readonly selected: string | number | string[] | number[];

  /**
   * Callback whenever a chip is clicked. This returns a new value of
   * selected chips.
   *
   * @param value
   */
  onChange(value?: string | number | string[] | number[]): void;

  /**
   * Callback when a specific chip is clicked
   *
   * @param event
   * @param clickedChipValue - The value of the chip that was clicked
   */
  onClickChip?(
    event: React.MouseEvent<HTMLElement>,
    clickedChipValue?: string | number,
  ): void;
}

export interface ChipSingleSelectProps extends ChipFoundationProps {
  readonly type?: "singleselect";
  readonly selected: string | number;
  onChange(value?: string | number): void;

  /**
   * The Chip's radio input name.
   *
   * @link https://www.w3schools.com/tags/att_input_name.asp
   */
  readonly name?: string;
}

interface ChipMultiSelectStringProps extends ChipFoundationProps {
  readonly type: "multiselect";
  readonly selected: string[];
  onChange(value: string[]): void;
}

interface ChipMultiSelectNumberProps extends ChipFoundationProps {
  readonly type: "multiselect";
  readonly selected: number[];
  onChange(value: number[]): void;
}

export type ChipMultiSelectProps = XOR<
  ChipMultiSelectStringProps,
  ChipMultiSelectNumberProps
>;

export type ChipsProps = XOR<ChipSingleSelectProps, ChipMultiSelectProps>;
