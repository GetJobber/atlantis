import React, { Children, ReactElement, isValidElement } from "react";
import { useAssert } from "@jobber/hooks/useAssert";
import { ComboboxActivator } from "../components/ComboboxActivator";
import {
  ComboboxOption,
  ComboboxOptionProps,
} from "../components/ComboboxOption";
import {
  ComboboxActionProps,
  ComboboxActivatorProps,
  ComboboxProps,
} from "../Combobox.types";
import { ComboboxAction } from "../components/ComboboxAction";

export const COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE =
  "Combobox must have exactly one Trigger element";

export function useComboboxValidation(children?: ComboboxProps["children"]): {
  triggerElement?: ReactElement;
  optionElements?: ReactElement[];
  actionElements?: ReactElement[];
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

  const shouldThrowTriggerError = isInvalid(activatorElements);

  useAssert(shouldThrowTriggerError, COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE);

  return {
    optionElements,
    triggerElement: activatorElements[0],
    actionElements,
  };
}

function isInvalid(
  activators: ReactElement<
    ComboboxActivatorProps,
    string | React.JSXElementConstructor<ComboboxActivatorProps>
  >[],
): boolean {
  return activators.length > 1 ? true : false;
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
