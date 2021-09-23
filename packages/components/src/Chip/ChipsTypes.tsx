import { ReactElement } from "react";
import { ChipProps } from "./Chip";

interface ChipFoundationProps<T> {
  readonly type: "choice" | "multiple" | "dismissible";
  readonly children: ReactElement<ChipProps<T>>[];
  readonly selected: T | T[];
  onChange(value?: T | T[]): void;
}

export interface ChipChoiceProps<T> extends ChipFoundationProps<T> {
  readonly type: "choice";
  readonly selected: T;
  onChange(value?: T): void;
}

export interface ChipChoiceMultipleProps<T> extends ChipFoundationProps<T> {
  readonly type: "multiple";
  readonly selected: T[];
  onChange(value?: T[]): void;
}

export type ChipsProps<T> = ChipChoiceProps<T> | ChipChoiceMultipleProps<T>;
