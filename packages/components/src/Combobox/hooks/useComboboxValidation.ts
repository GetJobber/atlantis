import { useAssert } from "@jobber/hooks/useAssert";
import { ReactElement } from "react";
import { getCompoundComponents } from "@jobber/components/DataList/DataList.utils";
import { ComboboxTriggerButtonProps } from "packages/components/dist/Combobox/Combobox.types";
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
  ComboboxTriggerChipProps,
} from "../Combobox.types";

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

  const shouldThrowTriggerError = validateTriggerCount(
    triggerButtons,
    triggerChips,
  );

  useAssert(shouldThrowTriggerError, COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE);

  return {
    optionElements,
    triggerElement: triggerButtons[0] || triggerChips[0],
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
): boolean {
  const hasMultipleTriggerTypes =
    triggerButtons.length > 0 && triggerChips.length > 0;
  const hasMutlipleButtons = triggerButtons.length > 1;
  const hasMultipleChips = triggerChips.length > 1;
  const hasNoTrigger = triggerButtons.length === 0 && triggerChips.length === 0;
  let invalid = false;

  if (
    hasMultipleTriggerTypes ||
    hasMutlipleButtons ||
    hasMultipleChips ||
    hasNoTrigger
  ) {
    invalid = true;
  }

  return invalid;
}
