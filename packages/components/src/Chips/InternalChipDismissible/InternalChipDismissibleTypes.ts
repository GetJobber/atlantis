import { ChipProps } from "../Chip";
import { ChipDismissibleProps } from "../ChipsTypes";

export type InternalChipDismissibleProps = Omit<ChipDismissibleProps, "type">;

export interface ChipDismissibleInputProps
  extends Pick<
    InternalChipDismissibleProps,
    "activator" | "isLoadingMore" | "onSearch" | "onLoadMore"
  > {
  readonly attachTo: React.RefObject<Element | null>;
  readonly options: ChipDismissibleInputOptionProps[];
  onCustomOptionSelect?(value: string): void;
  onOptionSelect(value: string): void;
  /**
   * Control whether the menu only appears once the user types.
   * @default false
   */
  readonly onlyShowMenuOnSearch?: boolean;
}

export interface ChipDismissibleInputOptionProps extends ChipProps {
  readonly custom: boolean;
}
