import { ReactElement } from "react";
import { ChipProps } from "./Chip";

interface ChipFoundationProps {
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
  readonly selected: string | Array<string | number> | number;
  readonly children: ReactElement<ChipProps>[];
  onChange(value?: string | number | Array<string | number>): void;

  /**
   * Callback when a single chip is clicked
   *
   * @param event
   * @param clickedChipValue - The value of the chip that was clicked
   */
  onClickChip?(
    event: React.MouseEvent<HTMLDivElement>,
    clickedChipValue?: string | number,
  ): void;
}

export interface ChipChoiceProps extends ChipFoundationProps {
  readonly type?: "singleselect";
  readonly selected: string | number;
  onChange(value?: string | number): void;
  onClickChip?(
    event: React.MouseEvent<HTMLDivElement>,
    clickedChipValue?: string | number,
  ): void;
}

export interface ChipChoiceMultipleProps extends ChipFoundationProps {
  readonly type: "multiselect";
  readonly selected: Array<string | number>;
  onChange(value: Array<string | number>): void;
  onClickChip?(
    event: React.MouseEvent<HTMLDivElement>,
    clickedChipValue?: string | number,
  ): void;
}

export type ChipsProps = ChipChoiceProps | ChipChoiceMultipleProps;
