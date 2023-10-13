import { ChipProps } from "../Chip";
import { ChipDismissibleProps } from "../ChipsTypes";

export interface ChipDismissibleInputProps
  extends Pick<
    ChipDismissibleProps,
    "isLoadingMore" | "onSearch" | "onLoadMore" | "type" | "activator"
  > {
  readonly attachTo: React.RefObject<Element | null>;
  readonly options: ChipProps[];
  onCustomOptionSelect?(value: string): void;
  onOptionSelect(value: string): void;
}

export interface ChipDismissibleInputOptionProps extends ChipProps {
  readonly custom: boolean;
}
