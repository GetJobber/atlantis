import type { ReactElement } from "react";
import { Children, isValidElement } from "react";
import { ComboboxActivator } from "../components/ComboboxActivator";
import {
  type ComboboxActionProps,
  type ComboboxActivatorProps,
  type ComboboxOptionProps,
  type ComboboxProps,
} from "../Combobox.types";
import { ComboboxAction } from "../components/ComboboxAction";
import { ComboboxOption } from "../components/ComboboxOption";

export const COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE =
  "Combobox must have exactly one Trigger element";

export function useComboboxValidation(children?: ComboboxProps["children"]): {
  triggerElement?: ReactElement<ComboboxActivatorProps>;
  optionElements?: ReactElement<ComboboxOptionProps>[];
  actionElements?: ReactElement<ComboboxActionProps>[];
} {
  const optionElements = getCompoundComponents<ComboboxOptionProps>(
    ComboboxOption,
    children,
  );
  const actionElements = getCompoundComponents<ComboboxActionProps>(
    ComboboxAction,
    children,
  );
  const activatorElements = getCompoundComponents<ComboboxActivatorProps>(
    ComboboxActivator,
    children,
  );

  return {
    optionElements,
    triggerElement: activatorElements[0],
    actionElements,
  };
}

/**
 * Return all instances child component that matches the `type` provided
 */
export function getCompoundComponents<T>(
  type: ReactElement<T>["type"],
  children?: ComboboxProps["children"],
): ReactElement<T>[] {
  const childrenArray = Children.toArray(children);
  const elements = childrenArray.filter(
    (child): child is ReactElement<T> =>
      isValidElement<T>(child) && child.type === type,
  );

  return elements;
}
