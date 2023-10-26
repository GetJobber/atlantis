import { useAssert } from "@jobber/hooks/useAssert";
import React, { ReactElement, ReactNode } from "react";
import {
  getCompoundComponent,
  getCompoundComponents,
} from "@jobber/components/DataList/DataList.utils";
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
import { ComboboxActionProps } from "../Combobox.types";

export const COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE =
  "Combobox can only have one Trigger element";
export const COMBOBOX_REQUIRED_CHILDREN_ERROR_MESSAGE =
  "Combobox must have a Trigger and Combobox.Content element";

export function useComboboxValidation(
  children: ReactElement | ReactElement[],
): {
  triggerElement?: ReactElement;
  optionElements?: ReactElement[];
  actionElements?: ReactElement[];
} {
  // const childrenArray = React.Children.toArray(children);
  const triggerButton = getCompoundComponent<ComboboxTriggerButtonProps>(
    children,
    ComboboxTriggerButton,
  );
  const triggerChip = getCompoundComponent<ComboboxTriggerButtonProps>(
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

  // childrenArray.forEach(child => {
  //   if (isTriggerElement(child)) {
  //     if (triggerElement) {
  //       multipleTriggersFound = true;
  //     }
  //     triggerElement = child;
  //   }

  //   if (isOptionElement(child)) {
  //     optionElements.push(child);
  //   }
  // });

  // useAssert(multipleTriggersFound, COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE);

  useAssert(
    !triggerButton && !triggerChip,
    COMBOBOX_REQUIRED_CHILDREN_ERROR_MESSAGE,
  );

  return {
    optionElements,
    triggerElement: triggerButton || triggerChip,
    actionElements,
  };
}

// function isTriggerElement(child: ReactNode): boolean {
//   return (
//     React.isValidElement(child) &&
//     (child.type === ComboboxTriggerButton || child.type === ComboboxTriggerChip)
//   );
// }

// function isOptionElement(child: ReactNode): boolean {
//   return React.isValidElement(child) && child.type === ComboboxOption;
// }

// function isActionElement(child: ReactNode): boolean {
//   return React.isValidElement(child) && child.type === ComboboxAction;
// }
