import { ChipProps } from "../Chip";
import { ChipDismissibleProps } from "../ChipsTypes";

export type InternalChipDismissibleProps = Omit<ChipDismissibleProps, "type">;

export interface ChipDismissibleInputProps
  extends Pick<
    InternalChipDismissibleProps,
    "activator" | "isLoadingMore" | "onSearch" | "onLoadMore"
  > {
  readonly options: ChipProps[];
  onEmptyBackspace(): void;
  onCustomOptionSelect?(value: string): void;
  onOptionSelect(value: string): void;
}

export interface ChipDismissibleInputOptionProps extends ChipProps {
  readonly custom: boolean;
}
