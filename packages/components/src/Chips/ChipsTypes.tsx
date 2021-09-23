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
  onChange(value?: string | Array<string | number> | number): void;
}

export interface ChipChoiceProps extends ChipFoundationProps {
  readonly type?: "singleselect";
  readonly selected: string | number;
  onChange(value?: string | number): void;
}

export interface ChipChoiceMultipleProps extends ChipFoundationProps {
  readonly type: "multiselect";
  readonly selected: Array<string | number>;
  onChange(value: Array<string | number>): void;
}

export type ChipsProps = ChipChoiceProps | ChipChoiceMultipleProps;
