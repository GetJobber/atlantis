import { ChipProps } from "../Chip";
import { ChipDismissibleProps } from "../ChipsTypes";

export type InternalChipDismissibleProps = Omit<ChipDismissibleProps, "type">;

export interface ChipDismissibleInputProps
  extends Pick<
    InternalChipDismissibleProps,
    "activator" | "isLoadingMore" | "onSearch" | "onLoadMore"
  > {
  readonly attachTo: React.RefObject<Element | null>;
  readonly options: ChipProps[];
  onCustomOptionSelect?(value: string): void;
  onOptionSelect(value: string): void;

  /**
   * Control whether the menu only appears once the user types.
   * @default false
   */
  readonly onlyShowMenuOnSearch?: boolean;

  /**
   * If true, automatically selects an option based on the current search value when the input loses focus.
   * The automatic selection order is: an exact match of the search value if available, a custom option if
   * onCustomOptionSelect is provided, or the closest match.
   * @default false
   */
  readonly submitInputOnFocusShift?: boolean;
}

export interface ChipDismissibleInputOptionProps extends ChipProps {
  readonly custom: boolean;
}
