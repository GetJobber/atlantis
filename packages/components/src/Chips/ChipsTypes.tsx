import { ReactElement } from "react";
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
  readonly selected: string | number | Array<string | number>;

  /**
   * Callback whenever a chip is clicked. This returns a new value of
   * selected chips.
   *
   * @param value
   */
  onChange(value?: string | number | Array<string | number>): void;

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

export interface ChipMultiSelectProps extends ChipFoundationProps {
  readonly type: "multiselect";
  readonly selected: Array<string | number>;
  onChange(value: Array<string | number>): void;
}

export type ChipsProps = ChipSingleSelectProps | ChipMultiSelectProps;
