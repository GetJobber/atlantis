import { useAssert } from "@jobber/hooks/useAssert";
import React, { ReactNode } from "react";
import {
  ComboboxTriggerButton,
  ComboboxTriggerChip,
} from "../components/ComboboxTrigger";
import { ComboboxContent } from "../components/ComboboxContent";

export const COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE =
  "Combobox can only have one Trigger element";
export const COMBOBOX_REQUIRED_CHILDREN_ERROR_MESSAGE =
  "Combobox must have a Trigger and Combobox.Content element";

export function useComboboxValidation(children: ReactNode): {
  triggerElement: ReactNode;
  contentElement: ReactNode;
} {
  const childrenArray = React.Children.toArray(children);
  let triggerElement: ReactNode,
    contentElement: ReactNode,
    multipleTriggersFound = false;

  childrenArray.forEach(child => {
    if (isTriggerElement(child)) {
      if (triggerElement) {
        multipleTriggersFound = true;
      }
      triggerElement = child;
    }

    if (isContentElement(child)) {
      contentElement = child;
    }
  });

  useAssert(multipleTriggersFound, COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE);

  useAssert(
    !triggerElement || !contentElement,
    COMBOBOX_REQUIRED_CHILDREN_ERROR_MESSAGE,
  );

  return {
    contentElement,
    triggerElement,
  };
}

function isTriggerElement(child: ReactNode): boolean {
  return (
    React.isValidElement(child) &&
    (child.type === ComboboxTriggerButton || child.type === ComboboxTriggerChip)
  );
}

function isContentElement(child: ReactNode): boolean {
  return React.isValidElement(child) && child.type === ComboboxContent;
}
