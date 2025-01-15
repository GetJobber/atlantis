import { RefObject } from "react";
import { XOR } from "ts-xor";

export interface MenuProps {
  readonly visible: boolean;
  readonly options: Option[];
  readonly selectedOption?: Option;

  /**
   * Element that it's attached to when the menu opens.
   */
  readonly attachTo: RefObject<Element | null>;
  onOptionSelect(chosenOption: Option): void;
}

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
