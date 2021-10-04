import { ChipProps } from "../Chip";

export interface ChipDismissibleInputProps {
  readonly options: ChipProps[];
  onEmptyBackspace(): void;
  onCustomOptionAdd(value: string): void;
  onOptionSelect(value: string): void;
}

export interface ChipDismissibleInputOptionProps extends ChipProps {
  readonly custom: boolean;
}
