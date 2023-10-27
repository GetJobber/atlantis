import React, { ReactElement, ReactNode } from "react";
import { useAssert } from "@jobber/hooks/useAssert";
import {
  ComboboxTriggerButton,
  ComboboxTriggerChip,
} from "../components/ComboboxTrigger";
import { ComboboxContent } from "../components/ComboboxContent";
import { ComboboxOption } from "../components/ComboboxOption";
import {
  ComboboxActionProps,
  ComboboxOption as ComboboxOptionProps,
} from "../Combobox.types";
import { ComboboxAction } from "../components/ComboboxAction";

export const COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE =
  "Combobox can only have one Trigger element";
export const COMBOBOX_REQUIRED_CHILDREN_ERROR_MESSAGE =
  "Combobox must have a Trigger and Combobox.Content element";

export function useComboboxValidation(children: ReactNode): {
  triggerElement: ReactNode;
  contentElement: ReactNode | undefined;
  optionElements: ReactElement<ComboboxOptionProps>[];
  actionElements: ReactElement<ComboboxActionProps>[];
} {
  const childrenArray = React.Children.toArray(children);
  let triggerElement: ReactNode,
    contentElement: ReactNode | undefined,
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

  const optionElements = childrenArray.filter(child =>
    isOptionElement(child),
  ) as ReactElement<ComboboxOptionProps>[];

  const actionElements = childrenArray.filter(child =>
    isActionElement(child),
  ) as ReactElement<ComboboxActionProps>[];

  useAssert(multipleTriggersFound, COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE);

  useAssert(
    !triggerElement || !contentElement,
    COMBOBOX_REQUIRED_CHILDREN_ERROR_MESSAGE,
  );

  return {
    contentElement,
    triggerElement,
    optionElements,
    actionElements,
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

function isOptionElement(child: ReactNode): boolean {
  return React.isValidElement(child) && child.type === ComboboxOption;
}

function isActionElement(child: ReactNode): boolean {
  return React.isValidElement(child) && child.type === ComboboxAction;
}
