import { XOR } from "ts-xor";

type OptionValue = string | number;

interface BaseOption {
  label: string;
}

export interface Option extends BaseOption {
  value?: OptionValue;
  description?: string;
  details?: string;
}

export interface GroupOption extends BaseOption {
  options: Option[];
}

export type AnyOption = XOR<Option, GroupOption>;
