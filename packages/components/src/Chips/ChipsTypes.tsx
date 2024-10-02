import { MouseEvent, ReactElement } from "react";
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

export interface ChipDismissibleProps extends ChipFoundationProps {
  readonly type: "dismissible";
  readonly selected: string[];
  onChange(value: string[]): void;

  /**
   * Use a custom activator to trigger the Chip option selector
   */
  readonly activator?: ReactElement;

  /**
   * Adds a loading indicator
   */
  readonly isLoadingMore?: boolean;

  /**
   * Callback when the user selects the custom option instead of the available
   * chips.
   *
   * If not implemented, it won't allow custom add.
   *
   * @param value
   */
  onCustomAdd?(value: string): void;

  /**
   * Callback when a user types a word that filters the options. Use this when
   * you need to query new options from the database based on the search value.
   *
   * @param searchValue - The input value
   */
  onSearch?(searchValue: string): void;

  /**
   * Callback when the user scrolls at the end of the chip option list. Use this
   * to load more options from the database.
   *
   * @param searchValue - The input value
   */
  onLoadMore?(searchValue: string): void;
}

export type ChipsProps =
  | ChipSingleSelectProps
  | (ChipMultiSelectProps | ChipDismissibleProps);
