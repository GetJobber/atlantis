import { ChipProps } from "../Chip";
import { ChipDismissibleProps } from "../ChipsTypes";

export interface ChipDismissibleInputProps
  extends Pick<ChipDismissibleProps, "activator"> {
  readonly options: ChipProps[];
  onEmptyBackspace(): void;
  onCustomOptionSelect(value: string): void;
  onOptionSelect(value: string): void;
}

export interface ChipDismissibleInputOptionProps extends ChipProps {
  readonly custom: boolean;
}
