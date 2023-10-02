import React, { ReactElement, ReactNode } from "react";
import { useAssert } from "@jobber/hooks/useAssert";
import { ComboboxContent } from "./components/ComboboxContent";
import { ComboboxAction } from "./components/ComboboxAction";
import { ComboboxContextProvider } from "./ComboboxProvider";
import {
  ComboboxTriggerButton,
  ComboboxTriggerChip,
} from "./components/ComboboxTrigger";

export interface ComboboxProps {
  readonly children: ReactElement | ReactElement[];

  /**
   * multi select
   * @default false
   * @type boolean
   * @description if true, allows multiple selections
   */
  readonly multiSelect?: boolean;
}

export const COMBOBOX_TRIGGER_COUNT_ERROR_MESSAGE =
  "Combobox can only have one Trigger element";
export const COMBOBOX_REQUIRED_CHILDREN_ERROR_MESSAGE =
  "Combobox must have a Trigger and Combobox.Content element";

export const Combobox = (props: ComboboxProps): JSX.Element => {
  const { contentElement, triggerElement } = useComboboxValidation(
    props.children,
  );
  return (
    <ComboboxContextProvider>
      {triggerElement}
      {contentElement}
    </ComboboxContextProvider>
  );
};

function useComboboxValidation(children: ReactNode): {
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

Combobox.TriggerButton = ComboboxTriggerButton;
Combobox.TriggerChip = ComboboxTriggerChip;
Combobox.Content = ComboboxContent;
Combobox.Action = ComboboxAction;
