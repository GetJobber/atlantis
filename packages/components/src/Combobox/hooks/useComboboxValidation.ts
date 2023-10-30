import { useAssert } from "@jobber/hooks/useAssert";
import { ReactElement } from "react";
import { getCompoundComponents } from "@jobber/components/DataList/DataList.utils";
import {
  ComboboxTriggerButton,
  ComboboxTriggerChip,
} from "../components/ComboboxTrigger";
import {
  ComboboxOption,
  ComboboxOptionProps,
} from "../components/ComboboxOption/ComboboxOption";
import { ComboboxAction } from "../components/ComboboxAction";
import {
  ComboboxActionProps,
  ComboboxActivatorProps,
  ComboboxTriggerButtonProps,
  ComboboxTriggerChipProps,
} from "../Combobox.types";
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
  const triggerButtons = getCompoundComponents<ComboboxTriggerButtonProps>(
    children,
    ComboboxTriggerButton,
  );
  const triggerChips = getCompoundComponents<ComboboxTriggerButtonProps>(
    children,
    ComboboxTriggerChip,
  );
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

  const shouldThrowTriggerError = validateTriggerCount(
    triggerButtons,
    triggerChips,
    activatorElements,
  );

  useAssert(shouldThrowTriggerError, COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE);

  return {
    optionElements,
    triggerElement:
      triggerButtons[0] || triggerChips[0] || activatorElements[0],
    actionElements,
  };
}

function validateTriggerCount(
  triggerButtons: ReactElement<
    ComboboxTriggerButtonProps,
    string | React.JSXElementConstructor<ComboboxTriggerButtonProps>
  >[],
  triggerChips: ReactElement<
    ComboboxTriggerButtonProps,
    string | React.JSXElementConstructor<ComboboxTriggerChipProps>
  >[],
  activators: ReactElement<
    ComboboxActivatorProps,
    string | React.JSXElementConstructor<ComboboxActivatorProps>
  >[],
): boolean {
  const hasMultipleTriggerTypes =
    (triggerButtons.length > 0 && triggerChips.length > 0) ||
    (triggerButtons.length > 0 && activators.length > 0) ||
    (triggerChips.length > 0 && activators.length > 0);
  const hasMutlipleButtons = triggerButtons.length > 1;
  const hasMultipleChips = triggerChips.length > 1;
  const hasMultipleActivators = activators.length > 1;
  let invalid = false;

  if (
    hasMultipleTriggerTypes ||
    hasMutlipleButtons ||
    hasMultipleChips ||
    hasMultipleActivators
  ) {
    invalid = true;
  }

  return invalid;
}
