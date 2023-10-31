import { useAssert } from "@jobber/hooks/useAssert";
import { ReactElement } from "react";
import { getCompoundComponents } from "@jobber/components/DataList/DataList.utils";
import {
  ComboboxOption,
  ComboboxOptionProps,
} from "../components/ComboboxOption/ComboboxOption";
import { ComboboxAction } from "../components/ComboboxAction";
import { ComboboxActionProps, ComboboxActivatorProps } from "../Combobox.types";
import { ComboboxActivator } from "../components/ComboboxActivator";

export const COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE =
  "Combobox must have exactly one Trigger element";

export function useComboboxValidation(
  children: ReactElement | ReactElement[],
): {
  triggerElement?: ReactElement;
  optionElements?: ReactElement[];
  actionElements?: ReactElement[];
} {
  const optionElements = getCompoundComponents<ComboboxOptionProps>(
    children,
    ComboboxOption,
  );
  const actionElements = getCompoundComponents<ComboboxActionProps>(
    children,
    ComboboxAction,
  );
  const activatorElements = getCompoundComponents<ComboboxActivatorProps>(
    children,
    ComboboxActivator,
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
