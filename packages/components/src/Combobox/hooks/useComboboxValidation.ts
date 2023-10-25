import { useAssert } from "@jobber/hooks/useAssert";
import React, { ReactNode } from "react";
import {
  ComboboxTriggerButton,
  ComboboxTriggerChip,
} from "../components/ComboboxTrigger";
import { ComboboxContent } from "../components/ComboboxContent";
import { ComboboxActivator } from "../components/ComboboxActivator";

export const COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE =
  "Combobox can only have one Trigger or Activator element";
export const COMBOBOX_REQUIRED_CHILDREN_ERROR_MESSAGE =
  "Combobox must have a Combobox.Content element";

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

  useAssert(!contentElement, COMBOBOX_REQUIRED_CHILDREN_ERROR_MESSAGE);

  return {
    contentElement,
    triggerElement,
  };
}

function isTriggerElement(child: ReactNode): boolean {
  return (
    React.isValidElement(child) &&
    (child.type === ComboboxTriggerButton ||
      child.type === ComboboxTriggerChip ||
      child.type === ComboboxActivator)
  );
}

function isContentElement(child: ReactNode): boolean {
  return React.isValidElement(child) && child.type === ComboboxContent;
}
