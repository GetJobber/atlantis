import type React from "react";
import type {
  FocusEvents,
  HTMLInputBaseProps,
  InputConstraintProps,
  KeyboardEvents,
  RebuiltInputCommonProps,
} from "../sharedHelpers/types";

export type InputNumberVersion = 1 | 2 | undefined;

export interface InputNumberRebuiltProps
  extends HTMLInputBaseProps,
    FocusEvents<HTMLInputElement>,
    KeyboardEvents<HTMLInputElement>,
    InputConstraintProps,
    Omit<RebuiltInputCommonProps, "clearable"> {
  readonly defaultValue?: number;
  readonly formatOptions?: Intl.NumberFormatOptions;

  readonly maxValue?: number;
  readonly minValue?: number;

  /**
   * Callback for value changes.
   * @param newValue - The new numeric value
   * @param event - Optional change event
   */
  readonly onChange?: (
    newValue: number,
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => void;

  readonly showMiniLabel?: boolean;
  readonly value?: number;
}

export interface InputNumberRebuiltRef {
  focus: () => void;
  blur: () => void;
}
