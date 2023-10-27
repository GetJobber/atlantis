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
export const COMBOBOX_OPTION_AND_CONTENT_EXISTS_ERROR =
  "Combobox prefers using Combobox.Option and Combobox.Action as the direct child of Combobox child instead of Combobox.Content";

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
  const optionElements: ReactElement<ComboboxOptionProps>[] = [];
  const actionElements: ReactElement<ComboboxActionProps>[] = [];

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

    if (isOptionElement(child)) {
      optionElements.push(child as ReactElement<ComboboxOptionProps>);
    }

    if (isActionElement(child)) {
      actionElements.push(child as ReactElement<ComboboxActionProps>);
    }
  });

  useAssert(multipleTriggersFound, COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE);
  useAssert(
    Boolean((optionElements.length || actionElements.length) && contentElement),
    COMBOBOX_OPTION_AND_CONTENT_EXISTS_ERROR,
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
